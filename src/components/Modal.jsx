import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = forwardRef(({ children, buttonCaption }, ref) => {
  const dialogRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialogRef}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    /* find this id in index.html => <div id="modal-root"></div> 
    By using createPortal, the dialog is rendered outside the regular hierarchy of the React component tree 
    and is instead placed directly as a child of the element with the id "modal-root" in the HTML file
    */
    document.getElementById("modal-root")
  );
});

export default Modal;
