import { useEffect, useRef, useState } from "react";
import { Variation } from "@/pages";
import { Collapse as BootstrapCollapse } from "bootstrap";

interface VariationRowProps {
    variation: Variation;
    setVariation: (name: string, values: string[]) => void;
    deleteVariation: () => void;
    isToggle?: boolean;
}

export function VariationListItem(props: VariationRowProps) {
    const [name, setName] = useState(props.variation.name);
    const [values, setValues] = useState(props.variation.values);
    const [focusIndex, setFocusIndex] = useState(-1);
    const [toggle, setToggle] = useState<boolean>(props.isToggle ?? false);
    const refCollapse = useRef(null);
    const nameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (refCollapse.current == null) return;
        const collapse = new BootstrapCollapse(refCollapse.current!, { toggle });
        if (toggle) {
            collapse.show();
            nameRef.current?.focus();
        } else {
            collapse.hide();
            nameRef.current?.blur();
        }
    }, [toggle]);

    return (
        <div>
            <div
                id="heading"
                className="d-flex justify-content-between align-items-space"
                onClick={() => {
                    setToggle((toggle) => !toggle);
                }}
            >
                <div>
                    <h6 className="mb-0">{props.variation.name}</h6>
                    <ol className="breadcrumb mb-0">
                        {props.variation.values.map((value) => (
                            <li className="breadcrumb-item" key={value}>
                                <span>{value}</span>
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="d-flex align-items-center">
                    <button className="btn btn-outline-primary me-2">Edit</button>
                    <button
                        className="btn btn-outline-danger"
                        onClick={props.deleteVariation}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div id="content" className="collapse" ref={refCollapse}>
                <hr />
                <div>
                    <div className="d-flex">
                        <div className="d-flex flex-column me-5">
                            <label>Name</label>
                            <div className="input-group">
                                <input
                                    ref={nameRef}
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
                                    <div key={index} className="input-group mb-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={values[index]}
                                            onChange={(e) =>
                                                setValues(
                                                    values.map((value, i) =>
                                                        i == index
                                                            ? e.target.value
                                                            : value
                                                    )
                                                )
                                            }
                                            autoFocus={index == focusIndex}
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={() =>
                                                setValues(
                                                    values.filter((_, i) => i != index)
                                                )
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
                                    setToggle(false);
                                    setValues(props.variation.values);
                                    setName(props.variation.name);
                                }
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
