import { Product } from "@/pages";

interface InventoryCardProps {
    product: Product;
    setProduct: (product: Product) => void;
}

export function Inventory(props: InventoryCardProps) {
    return (
        <div>
            <h5>Inventory</h5>
            <div>
                <div className="row mb-2">
                    <div className="col-3">
                        <label>SKU</label>
                        <input
                            type="text"
                            className="form-control"
                            value={props.product.sku}
                            onChange={(e) =>
                                props.setProduct({
                                    ...props.product,
                                    sku: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Barcode</label>
                        <input
                            type="text"
                            className="form-control"
                            value={props.product.barcode}
                            onChange={(e) =>
                                props.setProduct({
                                    ...props.product,
                                    barcode: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="col-6" />
                </div>
                <div className="row">
                    <div className="col-3">
                        <label>Unavailable</label>
                        <input
                            type="number"
                            className="form-control"
                            defaultValue={props.product.unavailable}
                            onChange={(e) =>
                                props.setProduct({
                                    ...props.product,
                                    unavailable: +e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="col-3">
                        <label>Commited</label>
                        <input
                            type="number"
                            className="form-control"
                            defaultValue={props.product.commited}
                            onChange={(e) =>
                                props.setProduct({
                                    ...props.product,
                                    commited: +e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="col-3">
                        <label>Available</label>
                        <input
                            type="number"
                            className="form-control"
                            defaultValue={props.product.available}
                            onChange={(e) =>
                                props.setProduct({
                                    ...props.product,
                                    available: +e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="col-3">
                        <label>On-hand</label>
                        <input
                            type="number"
                            className="form-control"
                            readOnly
                            disabled
                            value={
                                +props.product.available +
                                +props.product.unavailable +
                                +props.product.commited
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
