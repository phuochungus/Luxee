import { Variation } from "@/pages";
import React from "react";

interface VariationEditRowProps {
    variation: Variation;
    deleteVariation: () => void;
    setVariation: (name: string, values: string[]) => void;
    closeEditor: () => void;
}

export function VariationListItemEdit(props: VariationEditRowProps) {
    const [focusIndex, setFocusIndex] = React.useState(-1);
    const [name, setName] = React.useState(props.variation.name);
    const [values, setValues] = React.useState(props.variation.values);

    return (
        <div>
            <div className="d-flex">
                <div className="d-flex flex-column me-5">
                    <label>Name</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button
                            className="btn btn-outline-secondary"
                            onClick={props.deleteVariation}
                            tabIndex={-1}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-trash3"
                                viewBox="0 0 16 16"
                            >
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div>
                    <label>Values</label>
                    <div className="d-flex flex-column">
                        {values.map((_, index) => (
                            <div key={index} className="d-flex input-group">
                                <input
                                    type="text"
                                    className="form-control mb-1"
                                    value={values[index]}
                                    onChange={(e) =>
                                        setValues(
                                            values.map((value, i) =>
                                                i == index ? e.target.value : value
                                            )
                                        )
                                    }
                                    autoFocus={index == focusIndex}
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() =>
                                        setValues(values.filter((_, i) => i != index))
                                    }
                                    tabIndex={-1}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-trash3"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                onBeforeInput={(e: any) => {
                                    const value = e.data;
                                    if (value == "") {
                                        return;
                                    } else {
                                        e.preventDefault();
                                        setFocusIndex(values.length);
                                        setValues([...values, value]);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex mt-2">
                <button
                    className="btn btn-primary me-2"
                    onClick={() => {
                        props.setVariation(name, values);
                        props.closeEditor();
                    }}
                >
                    Save
                </button>
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => {
                        if (
                            props.variation.name == "" &&
                            props.variation.values.length == 0
                        ) {
                            props.deleteVariation();
                        } else {
                            props.closeEditor();
                            setValues(props.variation.values);
                            setName(props.variation.name);
                        }
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
