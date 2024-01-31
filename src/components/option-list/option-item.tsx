import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Collapse } from "bootstrap";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { Product } from "@/components";

export interface Option {
    name: string;
    values: String[];
}

interface Props {
    parentFieldIndex: number;
    deleteOption: () => void;
    isToggle?: boolean;
}

export function OptionListItem({ deleteOption, isToggle, parentFieldIndex }: Props) {
    const refCollapse = useRef(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const [focusIndex, setFocusIndex] = useState(-1);
    const [isShow, setIsShow] = useState<boolean>(isToggle ?? false);
    const rootMethods = useFormContext<Product>();

    const { register, getValues, control, reset } = useForm<Option>({
        defaultValues: rootMethods.watch(`options.${parentFieldIndex}`),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "values",
    });

    const { ref, ...rest } = register("name");

    useImperativeHandle(ref, () => nameRef.current);

    useEffect(() => {
        if (refCollapse.current == null) return;
        const collapse = new Collapse(refCollapse.current!, { toggle: isShow });
        if (isShow) {
            collapse.show();
            nameRef.current?.focus();
        } else {
            collapse.hide();
            nameRef.current?.blur();
        }
    }, [isShow]);

    return (
        <React.Fragment>
            <div
                id="heading"
                className="d-flex justify-content-between align-items-space"
                onClick={() => setIsShow((toggle) => !toggle)}
            >
                <div>
                    <h6 className="mb-0">
                        {rootMethods.watch(`options.${parentFieldIndex}.name`)}
                    </h6>

                    <ol className="breadcrumb mb-0">
                        {rootMethods
                            .watch(`options.${parentFieldIndex}.values`)
                            .map((field) => (
                                <li className="breadcrumb-item" key={field.toString()}>
                                    <span>{field}</span>
                                </li>
                            ))}
                    </ol>
                </div>
                <div className="d-flex align-items-center">
                    <button className="btn btn-outline-primary me-2" type="button">
                        Edit
                    </button>
                    <button
                        className="btn btn-outline-danger"
                        type="button"
                        onClick={deleteOption}
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
                                    {...rest}
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={deleteOption}
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
                                {fields.map((field, index) => (
                                    <div key={field.id} className="input-group mb-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register(`values.${index}`)}
                                            autoFocus={index == focusIndex}
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={() => remove(index)}
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
                                                setFocusIndex(getValues("values").length);
                                                append(value);
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
                            type="button"
                            onClick={() => {
                                rootMethods.setValue(
                                    `options.${parentFieldIndex}`,
                                    getValues()
                                );
                                setIsShow(false);
                            }}
                        >
                            Save
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => {
                                if (
                                    getValues("name") == "" &&
                                    getValues("values").length == 0
                                ) {
                                    deleteOption();
                                    setIsShow(false);
                                    return;
                                }
                                reset(rootMethods.watch(`options.${parentFieldIndex}`));
                                setIsShow(false);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
