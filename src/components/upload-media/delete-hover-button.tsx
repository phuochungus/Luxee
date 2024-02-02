import { useState } from "react";

export function DeleteHoverButton({ onClick }: { onClick: () => void }) {
    const [hover, setHover] = useState(false);
    return (
        <div
            id="delete-btn"
            className="d-flex"
            onClick={onClick}
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            draggable
            onDragStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            {hover ? (
                <i
                    className="bi bi-x-octagon-fill d-flex"
                    style={{ color: hover ? "red" : "red" }}
                />
            ) : (
                <i
                    className="bi bi-x-octagon d-flex"
                    style={{ color: hover ? "red" : "red" }}
                />
            )}
        </div>
    );
}
