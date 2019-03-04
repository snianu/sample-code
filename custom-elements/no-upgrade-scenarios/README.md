This document explores the question: "Can we avoid the cost of JS from custom elements when they exist in an asyncronously rendered subtree, i.e. a render=async or display-locked subtree?"

Things I think we need to answer the question:
1. Data on when JS for custom elements runs in Safari, Chrome, FF
1. One or more examples of scenarios using custom elements where we think the subtree in which the custom elements are used should be rendered async. 
1. A list of ideas on which JS execution can be part of some asynchronous deferral.
1. The pros and cons of those ideas

Data on when JS for custom elements runs


The index.html file contains a set of custom elements used to implement an accordion control.

What if I want the accordion control to render asynchronously: allow the style, layout and painting to complete atomically, but at a lower priority than the surrounding content of the page?

DisplayLocking offers a way to do this.
```
    <body>
        <accordion-element style="display:none"></accordion-element>
        ...
        <script>
            ...
            customElements.define("accordion-element", AccordionElement)
            ...
            const element = document.querySelector("accordion-element")
            const lock = accordion.displayLock
            lock.aquire({timeout: Infinity})
            .then(() => {
                element.style.display = "block"
                return lock.update()
            })
            .then(() => {
                return lock.commit()
            })
        </script>
    </body>
```

If I want to also have the custom element's upgrade to be deferred, how does that integrate with display locking?  Let's define upgrade deferral as follows:

A custom element will receive its `connectedCallback` 

additional changes need to be made.  The `accordion-element` was parsed into a "connected" document and define was called.  This would normally trigger an upgrade.  We'll need to ensure the lock is acquired before at least one of those actions occur.  
```
    <body>
        <accordion-element></accordion-element>
        ...
        <script>
            ...
            customElements.define("accordion-element", AccordionElement)
        </script>
    </body>
```

We could define upgrades to require that the element be "connected" and under a subtree that is not display locked before upgrade takes place.  Modifying the code to ensure the lock is aquired before calling define could then defer the upgrade.
```
    <body>
        <accordion-element></accordion-element>
        ...
        <script>
            ...
            const lock = document.querySelector("accordion-element").displayLock
            lock.aquire({timeout: Infinity})
            ...
            customElements.define("accordion-element", AccordionElement)
        </script>
    </body>
```
