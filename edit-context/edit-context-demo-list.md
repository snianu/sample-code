1. Position the candidate window for typing with IME (next to selection rect) and to prevent occlusion by software keyboard (over the editable rect).

2. Provide a text view of your web app's editable content to the OS to aid in generating suggestions.

3. Recieve text input events for composition without focusing an editable element in the DOM.  Frees sites to use native selection (and in the future native caret once we add an API to turn that on).

4. Provide your own style for text being actively composed. 

5. Hide and show the software keyboard (when allowed) by managing focus of the edit context.

6. Control the action which appears on the Enter key of the software keyboard in Android and ChromeOS.

7. Control which specialized software keyboard should appear when the EditContext is focused based on the specified type property.

Others:
* Avoid accessibility problems that come from hidden text area approach.
* Avoid complexity in duplicating some of all of a document's content into a hidden textarea or contenteditable elements.
* Avoid having contenteditable modify your web app's view in undesirable ways when typing and composing text.

https://bocupp-microsoft.github.io/sample-code/edit-context/candidate-window-position.html
https://bocupp-microsoft.github.io/sample-code/edit-context/software-keyboard-show-and-hide.html
https://bocupp-microsoft.github.io/sample-code/edit-context/software-keyboard-type.html
https://bocupp-microsoft.github.io/sample-code/edit-context/text-for-suggestions.html

