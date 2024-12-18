import './modal.css';
export default function Modal({ isOpen, setIsOpen, content, text }) {
    return isOpen ? (
        <div id="modal" class="modal">
            <div className="modal-content">
                <span className="close" onClick={() => setIsOpen(false)}>
                    &times;
                </span>
                {content ? content : <p>{text}</p>}
            </div>
        </div>
    ) : (
        <></>
    );
}
