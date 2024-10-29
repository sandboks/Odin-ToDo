

export const BackEnd = (function () {
    let pointerStartX = 0;
    let pointerStartY = 0;
    let draggableItem;


    function AddRowListeners(newRow) {
        newRow.addEventListener('mousedown', dragStart);
        document.addEventListener('mouseup', dragEnd);
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


    function dragStart(e) {
        console.log('Drag Start')

        draggableItem = e.target.closest('.taskRow')
        if (!draggableItem) return

        InitDraggableItem()
        InitItemsState();

        pointerStartX = e.clientX;
        pointerStartY = e.clientY;
    
        document.addEventListener('mousemove', drag)
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
    
    function drag(e) {
        console.log('Dragging')

        const currentPositionX = e.clientX
        const currentPositionY = e.clientY

        const pointerOffsetX = currentPositionX - pointerStartX
        const pointerOffsetY = currentPositionY - pointerStartY

        draggableItem.style.transform = `translate(${pointerOffsetX}px, ${pointerOffsetY}px)`
        UpdateIdleItemsStateAndPosition();
    }

    function UpdateIdleItemsStateAndPosition() {
        const draggableItemRect = draggableItem.getBoundingClientRect()
        const draggableItemY = draggableItemRect.top + draggableItemRect.height / 2
        const ITEMS_GAP = 0 //10
      
        // Update state
        GetIdleItems().forEach((item) => {
          const itemRect = item.getBoundingClientRect()
          const itemY = itemRect.top + itemRect.height / 2
          if (isItemAbove(item)) {
            if (draggableItemY <= itemY) {
              item.dataset.isToggled = ''
            } else {
              delete item.dataset.isToggled
            }
          } else {
            if (draggableItemY >= itemY) {
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
    
    function dragEnd() {
        if (!draggableItem) return
        console.log('Drag end')

        cleanup();
    }

    function cleanup() {
        unsetDraggableItem()
      
        document.removeEventListener('mousemove', drag)
      }

    function unsetDraggableItem() {
        draggableItem.style = null
        draggableItem.classList.remove('is-draggable')
        draggableItem.classList.add('is-idle')
        draggableItem = null
      }

    return {
        AddRowListeners,
    };
})();

