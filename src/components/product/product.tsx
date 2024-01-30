import React, { useEffect } from "react";
import {
    GenerateCollapse,
    Inventory,
    MediaUpload,
    Pricing,
    TextEditor,
    VariantTable,
    Option,
} from "@/components";
import cartesian from "cartesian";
import { FormProvider, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { OptionList } from "@/components/option-list/option-list";
import { Try } from "@mui/icons-material";

export interface Variant {
    sku?: string;
    barcode?: string;
    price: number;
    compareAt?: number;
    cost: number;
    unavailable: number;
    commited: number;
    available: number;
    media?: File[];
    selectedVariations: SelectedVariation[];
}

export interface SelectedVariation {
    name: string;
    value: string;
}

export interface VariationListContextProps {
    variationLists: Option[];
    setVariationLists: (arr: Option[]) => void;
}

export interface Product {
    title: string;
    description: string;
    media: File[];
    price: number;
    compareAt?: number;
    cost: number;
    sku?: string;
    barcode?: string;
    unavailable: number;
    commited: number;
    available: number;
    options: Option[];
    variants: Variant[];
}

export function Product() {
    const methods = useForm<Product>({
        defaultValues: {
            title: "",
            description: "",
            media: [],
            sku: "",
            barcode: "",
            cost: 0,
            unavailable: 0,
            commited: 0,
            available: 0,
            options: [],
            variants: [],
        },
    });
    const { register, getValues, watch, setValue, control, handleSubmit } = methods;

    useEffect(() => {
        const subscription = watch((_, { name }) => {
            if (name == "options")
                setValue("variants", generateVariants(getValues("options")));
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const generateVariants = (options: Option[]): Variant[] => {
        if (options.length == 0) return [];

        const filterEmptyVariations = options.filter((array) => array.values.length > 0);
        const onlyValuesArray: String[][] = filterEmptyVariations
            .map((array) => array.values)
            .map((array) => array.map((a) => a.value));

        const cartesianProduct = cartesian(onlyValuesArray);
        return cartesianProduct.map((array: string[]) => {
            const selectedVariations: SelectedVariation[] = array.map((value, index) => {
                return {
                    name: filterEmptyVariations[index].name,
                    value: value,
                };
            });
            return {
                selectedVariations,
                price: getValues("price"),
                cost: getValues("cost"),
                unavailable: getValues("unavailable"),
                available: getValues("available"),
                commited: getValues("commited"),
            };
        });
    };

    useEffect(() => {
        setValue(
            "options",

            [
                {
                    name: "Color",
                    values: [{ value: "Red" }, { value: "Blue" }, { value: "Green" }],
                },
                {
                    name: "Size",
                    values: [{ value: "S" }, { value: "M" }, { value: "L" }],
                },
                {
                    name: "Material",
                    values: [{ value: "Cotton" }, { value: "Polyester" }],
                },
            ]
        );
    }, []);

    const [showGenerateText, setShowGenerateText] = React.useState(false);

    const handleAutoPressed = () => {
        setShowGenerateText((showGenerateText) => !showGenerateText);
    };

    const onSubmit: SubmitHandler<Product> = async (product) => {
        try {
        } catch (error) {}
    };

    return (
        <FormProvider {...methods}>
            <div>
                <div
                    className="py-1 mb-2 bg-secondary d-flex justify-content-end"
                    style={{
                        zIndex: 100,
                        position: "sticky",
                        top: "0",
                    }}
                >
                    <button className="btn btn-light btn-sm">Preview</button>
                    <button className="btn btn-primary btn-sm mx-3">Save</button>
                </div>

                <div className="px-4" style={{ width: "100%" }}>
                    <div className="container shadow">
                        <form noValidate onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3 ">
                                <h5>Title</h5>
                                <input
                                    required
                                    autoFocus
                                    type="text"
                                    className="form-control"
                                    placeholder="Give your product a title.."
                                />
                                <div className="invalid-feedback">
                                    Please provide a title
                                </div>
                            </div>
                            <div className="mb-3">
                                <h5>Description</h5>
                                <TextEditor />
                                <div className="mt-2">
                                    <GenerateCollapse />
                                </div>
                            </div>
                            <div className="mb-3">
                                <h5>Media</h5>
                                <MediaUpload />
                            </div>
                            {watch("variants") && (
                                <>
                                    <div className="mb-3">
                                        <Pricing />
                                    </div>
                                    <div className="mb-3">
                                        <Inventory />
                                    </div>
                                </>
                            )}
                            <div className="mb-3">
                                <h5>Option</h5>
                                <OptionList />
                            </div>
                            {watch("variants") && <VariantTable />}
                        </form>
                    </div>
                </div>
            </div>
        </FormProvider>
    );
}
