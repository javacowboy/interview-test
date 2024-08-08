const FAQ = [
    {
        q: "How much does Photoshop cost?",
        a: "Plans start at US$22.99/mo."
    },
    {
        q: "Can you use Photoshop to edit videos?",
        a: "Yes, you can use Photoshop to edit videos."
    },
    {
        q: "Is Photoshop available without a subscription?",
        a: "Photoshop is only available as part of a Creative Cloud plan, which includes the latest features, updates, fonts, and more."
    }
];

// add code here if needed
function getFirstChildTextThenRemoveFirstChild(el) {
    let firstChild = el.firstElementChild;
    let text = firstChild.innerText;
    firstChild.remove();
    return text;
}

function addClassToParagraphsContainingLinks(el, className) {
    //search el for p tags.  search each p tag for a tags.  if number of a tags > 0, add className to p tag.
    el.querySelectorAll('p').forEach(para => {
        if(para.querySelectorAll('a').length) {
            para.className = className;
        }
    });

}

function addClassAndMoveToParentLevel(el, className) {
    el.className = className;
    el.parentElement.replaceWith(el);
}

function handleLinks(el, parentTagName, className) {
    //Check links within the element. 
    //If their parent matches the parentTagName, add the className to the link, move it to the parent level, and delete the parent.
    el.querySelectorAll('a').forEach(link => {
        let parent = link.parentElement;
        if(parent.localName === parentTagName) {
            addClassAndMoveToParentLevel(link, className);
        }
    });
}   

function faqQuestionClick(el) {
    let faqQuestions = document.querySelectorAll('.question');
    let faqAnswers = document.querySelectorAll('.answer');
    let selectedIndex = -1;
    //close all questions and answers and determine the index of the clicked question.
    faqQuestions.forEach((question, index) => {
        if(question === el) {
            selectedIndex = index;
        }
        question.className = 'question';
    });
    faqAnswers.forEach(answer => {
        answer.className = 'answer';
    });
    //open the clicked question and answer
    faqQuestions[selectedIndex].className = 'question open';
    faqAnswers[selectedIndex].className = 'answer open';
}

function processBackgroundColor(el) {
    // 1. Obtain the text content of the first child element of "el". Add the found text content as a background to "el". You can assume there will always text content.
    // 2. Remove the first child
    el.style.background = getFirstChildTextThenRemoveFirstChild(el);
}
function processHero(el) {
    processBackgroundColor(el);
    /* 1. If a paragraph has links, add the class "action-area" to the paragraph
       2. If a link is inside a bold tag:
            a. add the class "con-button" to the link
            b. move the link outside of the bold tag
            c. delete the bold tag
        3. If a link is inside an italics tag:
            a. add the classes "con-button blue" to the link
            b. move the link outside of the italics tag
            c. then delete the italics tag
    */
    addClassToParagraphsContainingLinks(el, 'action-area');
    handleLinks(el, 'b', 'con-button');
    handleLinks(el, 'i', 'con-button blue');
}
function processBrick(el) {
    processBackgroundColor(el);
    /*
    ###After the you run processBackgroundColor, the "brick" divs will always have 3 paragraphs remaining.  Updates to processBrick():###
    1. Add the class "title" to the first paragraph
    2. Add the class "price" to the second paragraph
    3. Add the class "description" to the third paragraph
    */
   let paragraphs = el.querySelectorAll('p');
   paragraphs[0].className = 'title';
   paragraphs[1].className = 'price';
   paragraphs[2].className = 'description';
}
function processFaq(el) {
    /*
    1. Make the function more flexible so that questions can easily be added or removed from the object
    2. Add the ability to click on a question to toggle the answer between open and closed states. 
    (bonus if you can get any open questions to close when you open a new one)
    */
   let innerHtml = '';
   FAQ.forEach(faq => {
        innerHtml += `<div class="faq-set">
                        <div class="question" onClick="faqQuestionClick(this)">
                            <div>
                                <h3>${faq.q}</h3>
                            </div>
                        </div>
                        <div class="answer">
                            <div>
                                <p>${faq.a}</p>
                            </div>
                        </div>
                    </div>`;
   });
    el.innerHTML = innerHtml;
    // add code here
}
function processBanner(el) {
    /*
    1. If a link is inside a bold tag:
        a. add the classes "con-button" and "blue" to the link
        b. move the link outside of the bold tag
        c. delete the bold tag
    2. Toggle the banner to only show when the "hero" div is completely off screen (bonus if you can make a small transition to slide up and down when revealing/hiding)
    */
    handleLinks(el, 'b', 'con-button blue');
}
document.querySelectorAll('.hero').forEach(processHero);
document.querySelectorAll('.brick').forEach(processBrick);
document.querySelectorAll('.faq').forEach(processFaq);
document.querySelectorAll('.banner').forEach(processBanner);