# DOM Manipulation - Interview Questions & Answers

## 1. Difference between getElementById, getElementsByClassName, and querySelector/querySelectorAll

**getElementById** Using the ID property, the method getElementById can locate an element of HTML.When there isn't any element under that ID, it returns null. getElementById only returns one thing or none at all.

**getElementsByClassName** getElementsByClassName choses many objects which are tagged with that class according to your HTMLDocument. It will take more than one. It returns an HTMLCollection, which is a live collection of elements.

**querySelector** The querySelector method is the most flexible of all, since it lets you use CSS selectors to find elements. If you pass in a class name as an argument, it returns just one (the first) matching element.

**querySelectorAll** querySelectorAll returns a NodeList containing all matching elements. It also accepts CSS selectors as arguments.
**Example:**
document.getElementById('header');
document.getElementsByClassName('btn');
document.querySelector('.btn');
document.querySelectorAll('.btn');



## 2. How to create and insert a new element into the DOM

First create an element through createElement(), afterwards add content or attributes to it, and finally put it on the DOM with methods like appendChild() or append().

**Example:**
javascript
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello World';
document.body.appendChild(newDiv);



## 3. What is Event Bubbling and how does it work?

Event bubbling is a mechanism where an event triggered by a child element will go up through all its parent elements to the top of the tree. For example, with this structure button > div > body - clicking the button will trigger the event first on the button, then on the div, and finally on the body element.

It is very useful because it makes handling dynamic elements easier, improves memory efficiency because we use one listener for several elements to listen, and gives better overall performance.


## 4. What is Event Delegation? Why is it useful?

Event delegation represents a general technique by which we add event listeners (or event handler functions) to a parent element and so manage any events which the child elements generate from this. It works in accordance with the principle of event bubbling.

**Why use it?**
 It makes the processing on dynamic elements more convenient, it uses one listener to listen multiple elements which improves memory efficiency and on top of that provides more efficient performance.

**Example:**
javascript
parentElement.addEventListener('click', function(e) {
  if(e.target.classList.contains('item')) {
    // handle the click
  }
});



## 5. Difference between preventDefault() and stopPropagation()

The **preventDefault()** method stops the default behavior of the browser for events. For instance, a link will not redirect to another page, or form submission may be hindered.

**stopPropagation()** prevents an event from reaching the parent elements. It keeps the event from going any further up in DOM tree structure.

In simple terms, preventDefault means "do not perform default action", while stopPropagation means "do not pass this event to parent elements."

**Example:**
```javascript
// preventDefault example
linkElement.addEventListener('click', (e) => {
  e.preventDefault(); // link won't redirect
});

// stopPropagation example
button.addEventListener('click', (e) => {
  e.stopPropagation(); // event won't bubble to parent
});
```

---

## Notes
- These are common JavaScript DOM manipulation interview questions
- Practice these concepts with live coding examples
- Understanding event bubbling and delegation is crucial for efficient DOM handling

---
