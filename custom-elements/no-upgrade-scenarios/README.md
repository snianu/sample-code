This document explores the question: "Can we avoid the cost of JS from custom elements when they exist in an asyncronously rendered subtree, i.e. a render=async or display-locked subtree?"

Things I think we need to answer the question:
1. Data on when JS for custom elements runs
1. One or more examples of scenarios using custom elements where we think the subtree in which the custom elements are used should be rendered async. 
1. A list of ideas on which JS execution can be part of some asynchronous deferral.
1. The pros and cons of those ideas

## Data on when JS for custom elements runs
<a href="https://wpt.fyi/results/custom-elements?label=master&product=chrome%5Bexperimental%5D&product=edge&product=firefox%5Bexperimental%5D&product=safari%5Bexperimental%5D&aligned">wpt.fyi custom element tests</a> for reference.

Criteria for executing the script of a custom element:
1. When a custom element is defined for a given browsing context, any custom element connected to the document of that browsing context will be upgraded
1. When a custom element is created via document.createElement, it will be upgraded (before createElement returns) if the browsing context associated with the document on which createElement was called has the custom element defined
1. When parsed via innerHTML, custom elements will be upgraded if the parent element is owned by a document whose browsing context has the custom element defined
1. customElements.upgrade(node) can be used to upgrade a custom element explicitly when in a non-connected tree that is owned by a document hav ing the same browsing context as the CustomElementsRegistry

To prevent execution of script today, a developer must have:
1. Created the elements before defining them as custom elements
1. Created the elements using a document that doesn't have a browsing context or that has one without the corresponding custom element definition
1. Related to the previous point, a template's contents are associated with a template owner document that has no browsing context.  As a result custom elements defined in a template are not upgraded even after definition occurs in the browsing context associated with the template

## Scenarios where Custom Element Script should be Deferred
1. Summary / detail views can have detail rendered async (some sample code)
1. Related to the previous point, a real life example of this might be the Outlook mail client.  Clicking on a message summary will load the body of the message.
1. Dashboard content which renders some significant visualization could be rendered async

Scenarios 1 and 2 benefit most from dynamic content being asynchronously rendered.  Scenario 3 can benefit from initial page load.

## Opportunities and Obstacles for Deferring Custom Element Script
Initial page load scenarios can get a win if we amend the custom elements spec to say that upgrades occur after definition for elements in the connected document but not in a subtree that is marked for asynchronous rendering.

The upgrades can run interleaved.



## Backup Material / WIP...
Avoiding definition of custom elements seems like a bad idea as 

When created via document.createElement from a document associated with a browsing context that has the name supplied defined as a custom element.
During parsing


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
