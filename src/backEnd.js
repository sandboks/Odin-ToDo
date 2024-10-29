/*
large parts of the drag and drop functionality were borrowed from here:
https://tahazsh.com/blog/seamless-ui-with-js-drag-to-reorder-example/
*/



export const BackEnd = (function () {
    let pointerStartX = 0;
    let pointerStartY = 0;
    let draggableItem;

    let isDragging = false;


    function AddRowListeners(newRow) {
        newRow.addEventListener('mousedown', click);
        document.addEventListener('mouseup', mouseUp);
        
        newRow.addEventListener('touchstart', click)
        document.addEventListener('touchend', mouseUp)
    }

    function DisablePageScroll() {
        document.body.style.overflow = 'hidden'
        document.body.style.touchAction = 'none'
        document.body.style.userSelect = 'none'
      }
      
      function EnablePageScroll() {
        document.body.style.overflow = ''
        document.body.style.touchAction = ''
        document.body.style.userSelect = ''
      }

    let items = []

    function GetAllItems() {
    if (!items?.length) {
        items = Array.from(document.querySelectorAll('.taskRow'))
    }
    return items
    }

    function GetIdleItems() {
        //return getAllItems().filter((item) => item.classList.contains('is-idle'))
        return GetAllItems().filter((item) => !item.classList.contains('is-draggable'))
    }

    function click(e) {
        console.log("click");

        draggableItem = e.target.closest('.taskRow')
        if (!draggableItem) return

        InitDraggableItem()
        InitItemsState();
        DisablePageScroll();

        pointerStartX = e.clientX || e.touches[0].clientX
        pointerStartY = e.clientY || e.touches[0].clientY
    
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('touchmove', mouseMove, { passive: false });
    }


    function dragStart(e) {
        console.log('Drag Start')

        draggableItem = e.target.closest('.taskRow')
        if (!draggableItem) return

        InitDraggableItem()
        InitItemsState();
        DisablePageScroll();

        pointerStartX = e.clientX || e.touches[0].clientX
        pointerStartY = e.clientY || e.touches[0].clientY
    
        document.addEventListener('mousemove', drag)
        document.addEventListener('touchmove', drag, { passive: false });
    }

    function InitDraggableItem() {
        //draggableItem.classList.remove('is-idle')
        draggableItem.classList.add('is-draggable')
    }

    function InitItemsState() {
        GetIdleItems().forEach((item, i) => {
          if (GetAllItems().indexOf(draggableItem) > i) {
            item.dataset.isAbove = ''
          }
        })
    }

    function mouseMove(e) {
        e.preventDefault(); //make it work on iPhone

        const currentPositionX = e.clientX || e.touches[0].clientX
        const currentPositionY = e.clientY || e.touches[0].clientY

        const pointerOffsetX = currentPositionX - pointerStartX
        const pointerOffsetY = currentPositionY - pointerStartY

        if (!isDragging && Math.sqrt(Math.pow(pointerOffsetX, 2) + Math.pow(pointerOffsetY, 2)) > 10) {
            console.log("IS DRAGGING");
            isDragging = true;
        }

        if (isDragging) {
            draggableItem.style.transform = `translate(${pointerOffsetX}px, ${pointerOffsetY}px)`
            UpdateIdleItemsStateAndPosition();
        }

    }
    
    function drag(e) {
        console.log('Dragging')

        e.preventDefault(); //make it work on iPhone

        const currentPositionX = e.clientX || e.touches[0].clientX
        const currentPositionY = e.clientY || e.touches[0].clientY

        const pointerOffsetX = currentPositionX - pointerStartX
        const pointerOffsetY = currentPositionY - pointerStartY

        draggableItem.style.transform = `translate(${pointerOffsetX}px, ${pointerOffsetY}px)`
        UpdateIdleItemsStateAndPosition();
    }

    function UpdateIdleItemsStateAndPosition() {
        const draggableItemRect = draggableItem.getBoundingClientRect()
        const draggableItemY = draggableItemRect.top + (draggableItemRect.height / 2)
        const ITEMS_GAP = 0 //10
      
        // Update state
        GetIdleItems().forEach((item) => {
          const itemRect = item.getBoundingClientRect()
          const itemY = itemRect.top + (itemRect.height / 2)
          if (isItemAbove(item)) {
            if (draggableItemY <= itemY) { //<= itemY + (itemRect.height / 4)
              item.dataset.isToggled = ''
            } else {
              delete item.dataset.isToggled
            }
          } else {
            if (draggableItemY>= itemY) {
              item.dataset.isToggled = ''
            } else {
              delete item.dataset.isToggled
            }
          }
        })
      
        // Update position
        GetIdleItems().forEach((item) => {
          if (isItemToggled(item)) {
            const direction = isItemAbove(item) ? 1 : -1
            item.style.transform = `translateY(${
              direction * (draggableItemRect.height + ITEMS_GAP)
            }px)`
          } else {
            item.style.transform = ''
          }
        })
      }
      
    function isItemAbove(item) {
        return item.hasAttribute('data-is-above')
    }
    
    function isItemToggled(item) {
        return item.hasAttribute('data-is-toggled')
    }

    function mouseUp() {
        if (isDragging) {
            dragEnd();
        }
        else {
            console.log("CLICKED ON OBJECT");
            cleanup();
        }
    }
    
    function dragEnd() {
        
        //if (!draggableItem) return
        console.log('Drag end')
        isDragging = false;

        ApplyNewItemsOrder();
        cleanup();
    }

    function cleanup() {
        items = [];
        unsetDraggableItem()
        unsetItemState();
        EnablePageScroll();
      
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('touchmove', mouseMove);
    }

    function unsetDraggableItem() {
        draggableItem.style = null
        draggableItem.classList.remove('is-draggable')
        draggableItem.classList.add('is-idle')
        draggableItem = null
    }

    function unsetItemState() {
        GetIdleItems().forEach((item, i) => {
          delete item.dataset.isAbove
          delete item.dataset.isToggled
          item.style.transform = ''
        })
      }

    function ApplyNewItemsOrder() {
        const reorderedItems = []
      
        GetAllItems().forEach((item, index) => {
            if (item === draggableItem) {
                return
            }
            if (!isItemToggled(item)) {
                reorderedItems[index] = item
                return
            }
            const newIndex = isItemAbove(item) ? index + 1 : index - 1
            reorderedItems[newIndex] = item
        })
      
        for (let index = 0; index < GetAllItems().length; index++) {
            const item = reorderedItems[index]
            if (typeof item === 'undefined') {
                reorderedItems[index] = draggableItem
            }
        }
      
        reorderedItems.forEach((item) => {
            document.querySelector(".tasksContainer").appendChild(item)
        })
    }

    return {
        AddRowListeners,
    };
})();

