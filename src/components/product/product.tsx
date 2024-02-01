import { useEffect, useRef } from "react";
import {
    GenerateCollapse,
    Inventory,
    Media,
    Pricing,
    TextEditor,
    VariantTable,
    Option,
} from "@/components";
import cartesian from "cartesian";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { OptionList } from "@/components/option-list/option-list";
import { useLoaderData } from "react-router-dom";
import { createProduct } from "@/client";

export interface Variant {
    sku?: string;
    barcode?: string;
    price: number;
    compareAt?: number;
    cost: number;
    unavailable: number;
    committed: number;
    available: number;
    media?: Media[];
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
    media: Media[];
    price: number;
    compareAt?: number;
    cost: number;
    sku?: string;
    barcode?: string;
    unavailable: number;
    committed: number;
    available: number;
    options: Option[];
    variants: Variant[];
}

export function Product() {
    const methods = useForm<Product>({
        defaultValues: useLoaderData() as Product,
    });

    useEffect(() => {
        const subscription = methods.watch((_, { name }) => {
            if (name?.includes("options"))
                methods.setValue(
                    "variants",
                    generateVariants(methods.getValues("options"))
                );
        });
        return () => subscription.unsubscribe();
    }, [methods.watch]);

    const generateVariants = (options: Option[]): Variant[] => {
        if (options.length == 0) return [];

        const filterEmptyVariations = options.filter((array) => array.values.length > 0);
        const onlyValuesArray: String[][] = filterEmptyVariations.map(
            (array) => array.values
        );

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
                price: methods.getValues("price"),
                cost: methods.getValues("cost"),
                unavailable: methods.getValues("unavailable"),
                available: methods.getValues("available"),
                committed: methods.getValues("committed"),
            };
        });
    };

    // useEffect(() => {
    //     methods.setValue("options", [
    //         {
    //             name: "Color",
    //             values: ["Red", "Blue", "Green"],
    //         },
    //         {
    //             name: "Size",
    //             values: ["S", "M", "L"],
    //         },
    //         {
    //             name: "Material",
    //             values: ["Cotton", "Polyester", "Wool"],
    //         },
    //     ]);
    // }, []);

    const onSubmit: SubmitHandler<Product> = async (product) => {
        formRef.current?.classList.add("was-validated");
        if (!formRef.current?.checkValidity()) return;
        // console.log(product);
        try {
            const res = await createProduct(product);
            console.log(await res.json());
        } catch (error) {
            console.error(error);
        }
    };

    const formRef = useRef<HTMLFormElement>(null);

    return (
        <FormProvider {...methods}>
            <div style={{ width: "100%" }}>
                <div
                    className="py-1 mb-2 bg-secondary d-flex justify-content-end"
                    style={{
                        zIndex: 100,
                        position: "sticky",
                        top: "0",
                    }}
                >
                    <button className="btn btn-light btn-sm" type="button">
                        Preview
                    </button>
                    <button
                        className="btn btn-primary btn-sm mx-3"
                        type="button"
                        onClick={methods.handleSubmit(onSubmit)}
                    >
                        Save
                    </button>
                </div>

                <div className="px-4" style={{ width: "100%" }}>
                    <div className="container shadow">
                        <form
                            className="needs-validation"
                            ref={formRef}
                            noValidate
                            onSubmit={methods.handleSubmit(onSubmit)}
                        >
                            <div className="mb-3 ">
                                <h5>Title</h5>
                                <div>
                                    <input
                                        {...methods.register("title")}
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
                                <Media />
                            </div>
                            {!methods.watch("variants")?.length && (
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
                            {methods.watch("variants") && <VariantTable />}
                        </form>
                    </div>
                </div>
            </div>
        </FormProvider>
    );
}
