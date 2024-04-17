import "monday-ui-react-core/dist/main.css";
import './App.css';
import mondaySdk from 'monday-sdk-js';
import Toolbar from './Toolbar';
import { useEffect, useRef, useState } from 'react';
import Delta from 'quill-delta';
import Footer from "./Footer";

const monday = mondaySdk();

function App() {

  const [highlightedText, setHighlightedText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const newText = useRef(null);
  const currentContext = useRef(null);

  useEffect(() => {
    // set context
    monday.get('context')
      .then((res) => {
        checkSubscription();
        setHighlightedText(res.data.highlightedText.trim());
        currentContext.current = res.data;
      })
      .catch((err) => console.error(err));
  }, []);

  function handleSearchInputChange(event) {
    setHighlightedText(event);
  }

  function handleNewTextChange(event) {
    newText.current = event;
  }

  function handleCaseSensitiveChange() {
    caseSensitive ? setCaseSensitive(false) : setCaseSensitive(true);
  }

  function handleClick() {
    try {
      monday.execute("valueCreatedForUser");
      
      let query = "{ docs(ids: " + currentContext.current.docId + ") { blocks { id content }}}"

      monday.api(query)
        .then(res => returnBlocksWithStringFromJSON(highlightedText, res))
        .then(res => updateBlocks(res, highlightedText, newText.current))
        .finally(() => monday.execute('closeDocModal'));
    } catch (error) {
      console.error(error);
    }
  }

  function returnBlocksWithStringFromJSON(searchString, json) {
    const blocksWithText = [];
    json.data.docs.forEach(doc => {
      doc.blocks.forEach(block => {
        if (caseSensitive) {
          block.content.includes(searchString) ? blocksWithText.push(block) : (function () { })();
        } else {
          block.content.toLowerCase().includes(searchString.toLowerCase()) ? blocksWithText.push(block) : (function () { })();
        }
      })
    });
    return blocksWithText;
  }

  function updateBlocks(blocks, oldString, newString) {
    let regex;
    if (caseSensitive) {
      regex = new RegExp('\\b' + oldString + '\\b', 'g');
    } else {
      regex = new RegExp('\\b' + oldString + '\\b', 'gi');
    }
    for (const block of blocks) {
      let delta = new Delta(JSON.parse(block.content.replaceAll(regex, newString)).deltaFormat);
      const id = block.id;
      const content = {
        deltaFormat: delta
      };
      monday.execute('updateDocBlock', { id, content });
    }
  }

  async function checkSubscription() {
    const sessionToken = await monday.get('sessionToken');

    let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + sessionToken.data);

        try {
    const response = await fetch(`https://bq54bditgi.execute-api.eu-north-1.amazonaws.com/Prod/verify`, {
          mode: 'cors',
          method: "GET",
          headers: headers
        });

        if (response.status === 200) {
          setIsSubscribed(true);
        } else if (response.status === 402) {
          monday.execute('openPlanSelection', {isInPlanSelection: true});
          monday.execute('closeDocModal');
        } else {
          monday.execute("notice", { 
            message: "Invalid token",
            type: "error", // or "error" (red), or "info" (blue)
            timeout: 10000,
         });
        } }
        catch (error) {
          console.log(error);
        }
  }

  if (currentContext.current !== null) {
    return (
      <div className="App">
        {(currentContext.current.user.isGuest || currentContext.current.user.isViewOnly || !isSubscribed) ? <h2>You are not allowed to use this feature. Ask Admin to grant member access.</h2> : (
          <Toolbar
            phrase={highlightedText}
            caseSensitive={caseSensitive}
            handleClick={handleClick}
            handleSearchChange={handleSearchInputChange}
            handleNewTextChange={handleNewTextChange}
            handleCaseChange={handleCaseSensitiveChange} />
        )}
        <Footer />
      </div>
    );
  }
}

export default App;
