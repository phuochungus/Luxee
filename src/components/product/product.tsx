import { useEffect, useRef, useState } from "react";
import {
    GenerateCollapse,
    Inventory,
    UploadMedia,
    Pricing,
    TextEditor,
    VariantTable,
    Option,
    UploadMediaRef,
    Media,
    Value,
} from "@/components";
import cartesian from "cartesian";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { OptionList } from "@/components/option-list/option-list";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import {
    createProduct,
    createVariants,
    getProductById,
    updateMedia,
    updateProduct,
} from "@/client";

export interface Variant {
    variantId?: number;
    sku?: string;
    barcode?: string;
    price: number;
    compareAt?: number;
    cost: number;
    unavailable: number;
    committed: number;
    available: number;
    media?: Media[];
    variantOptionValues: VariantOptionValues[];
}

export interface VariantOptionValues {
    optionId?: number;
    valueId?: number;
    value: Value;
}

export interface VariationListContextProps {
    variationLists: Option[];
    setVariationLists: (arr: Option[]) => void;
}

export interface Product {
    id?: number;
    title: string;
    description: string;
    media: Media[];
    price?: number;
    compareAtPrice?: number;
    cost?: number;
    sku?: string;
    barcode?: string;
    unavailable?: number;
    committed?: number;
    available?: number;
    options: Option[];
    variants: Variant[];
}

export function Product() {
    const formRef = useRef<HTMLFormElement>(null);
    const mediaRef = useRef<UploadMediaRef>(null);
    const { id } = useParams();

    const methods = useForm<Product>({
        defaultValues: useLoaderData() as Product,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const subscription = methods.watch((_, { name }) => {
            if (name?.includes("options")) {
                methods.setValue(
                    "variants",
                    generateVariants(methods.getValues("options"))
                );
                if (methods.getValues("options").length != 0) {
                    methods.setValue("price", undefined);
                    methods.setValue("compareAtPrice", undefined);
                    methods.setValue("cost", undefined);
                    methods.setValue("unavailable", undefined);
                    methods.setValue("available", undefined);
                    methods.setValue("committed", undefined);
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [methods.watch]);

    const generateVariants = (options: Option[]): Variant[] => {
        if (options.length == 0) return [];
        const tmpOption = options.filter((a) => a.values.length != 0);
        const cartesianProductOfValue: Value[][] = cartesian(
            tmpOption.map((a) => a.values)
        );
        return cartesianProductOfValue.map((values) => {
            const array: VariantOptionValues[] = values.map((value) => {
                return {
                    value: value,
                };
            });
            return {
                variantOptionValues: array,
                price: methods.getValues("price") || 0,
                cost: methods.getValues("cost"),
                unavailable: methods.getValues("unavailable"),
                available: methods.getValues("available"),
                committed: methods.getValues("committed"),
            } as Variant;
        });
    };

    const onSubmit: SubmitHandler<Product> = async (product) => {
        if (id != "new") {
            await handleUpdateExistingProduct(product);
        } else {
            await handleCreateNewProduct(product);
        }
    };

    const handleCreateNewProduct = async (product: Product) => {
        formRef.current?.classList.add("was-validated");
        if (!formRef.current?.checkValidity()) return;
        const { variants, ...rest } = product;
        try {
            const productId = Number(await (await createProduct(rest)).text());
            const media = await mediaRef.current!.sendMedia(productId);
            if (media.length != 0) await updateMedia(productId, media);
            const newProduct: Product = await (await getProductById(productId)).json();
            product.options = newProduct.options;
            product.id = newProduct.id;
            product.media = newProduct.media;
            for (let i = 0; i < product.variants.length; i++) {
                let variant = product.variants[i];
                let c = 0;
                variant.variantOptionValues.forEach((v) => {
                    let option = product.options[c];
                    v.optionId = option.id;
                    v.valueId = option.values.find((a) => a.value == v.value.value)?.id;
                    c++;
                });
                c = 0;
            }
            await createVariants(productId, product.variants);
            navigate(`/products/${productId}`);
        } catch (error) {
            // TODO: CREATE TOAST ABOUT THE ERROR MESSAGE
            console.error(error);
        }
    };

    const handleUpdateExistingProduct = async (product: Product) => {
        formRef.current?.classList.add("was-validated");
        if (!formRef.current?.checkValidity()) return;
        const { variants, ...rest } = product;
        try {
            await updateProduct(rest);
            const media = await mediaRef.current!.sendMedia(product.id!);
            if (media.length != 0) await updateMedia(product.id!, media);
        } catch (error) {}
    };

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
                                <UploadMedia
                                    media={methods.watch("media")}
                                    ref={mediaRef}
                                />
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
