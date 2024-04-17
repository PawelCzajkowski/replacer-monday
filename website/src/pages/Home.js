import pieceOfText from "../assets/piece-of-text.png"
import revertChange from "../assets/revert-change.png"
import mailtoPicture from "../assets/mail-to-example.png"
import usageVideo from "../assets/how-to-use-it.webm"

export default function Home() {
    return <>
        <div id="description">
            <p class="container-md">Replacer is a simple and easy to use tool to change a word or a piece of text in the whole
                doc in a few seconds. Let's say you have to change a name or an email address which is placed in many places of
                your doc. Instead of scrolling and do it manually you can do it in a few simple steps.</p>
        </div>
        <div id="howto">
            <h3 class="text-center">How to use it</h3>
            <div class="container-md">
                <ol>
                    <li>
                        <p>Select a word or a piece of text which you want to change</p>
                    </li>
                    <li>
                        <p>Select Replacer from context bar</p>
                    </li>
                    <li>
                        <p>Type a new phrase or a new word. Correct the original text if needed</p>
                        <p class="center alert alert-info info" role="alert"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                            <path
                                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                        </svg> Replacer is case sensitive by default. If you want to ignore case sensitivity uncheck option.</p>
                    </li>
                    <li>Click "Replace" button</li>
                </ol>
                <video class="video-center" width={810} height={459} controls autoPlay loop>
                    <source src={usageVideo} type="video/webm" />
                </video>
            </div>
        </div>
        <div id="faq">
            <h3 class="text-center">FAQ</h3>
            <div class="accordion accordion-flush container-md" id="accordionFlushExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Who can use this feature?
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">This feature is only enable for admins and member users.
                            Guests and viewers are not allow to do any changes in the doc.</div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            How to revert changes?
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo"
                        data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">To revert changes you can easily select the previous version of your document
                            by clicking timestamp on the top right corner of your doc.
                            <img class="example" alt="" src={revertChange} />
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            Can I replace a piece of text?
                        </button>
                    </h2>
                    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree"
                        data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">Yes, you can replace a word or piece of text. The easiest way is to highligt
                            the piece of text which you want to replace. Click "R" from the context toolbar and type new text.
                            <img class="example" alt="" src={pieceOfText} />
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingFour">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                            Does it change email addresses?
                        </button>
                    </h2>
                    <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour"
                        data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">Yes, you can replace an existing email address with a new one. You can verify change by hover mouse cursor on a mail address.
                            <img class="example" alt="" src={mailtoPicture} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="contact" class="container-sm">
            <h3 class="text-center">Contact</h3>
            <p>Do you have any more questions? Do you want to report a bug? Maybe you have some suggestions? Please <a href="mailto:support@replacer.pl">contact me!</a>
            </p>
        </div>
    </>
}