import { Product } from "@/pages";

interface PricingProps {
    product: Product;
    setProduct: (product: Product) => void;
}

export function Pricing(props: PricingProps) {
    return (
        <div>
            <h5>Pricing</h5>
            <div className="row mb-2">
                <div className="col-3">
                    <label>Price*</label>
                    <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                            type="number"
                            className="form-control"
                            required
                            defaultValue={props.product.price}
                            onChange={(e) =>
                                props.setProduct({
                                    ...props.product,
                                    price: +e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="col-3">
                    <label>Compare-at</label>
                    <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                            type="number"
                            className="form-control"
                            defaultValue={props.product.compareAt}
                            onChange={(e) =>
                                props.setProduct({
                                    ...props.product,
                                    compareAt: +e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <label>Cost</label>
                    <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                            type="number"
                            className="form-control"
                            defaultValue={props.product.cost}
                            onChange={(e) =>
                                props.setProduct({
                                    ...props.product,
                                    cost: +e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
                <div className="col-3">
                    <label>Profit</label>
                    <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                            type="string"
                            className="form-control"
                            readOnly
                            disabled
                            value={
                                props.product.price == 0
                                    ? "--"
                                    : props.product.price - props.product.cost
                            }
                        />
                    </div>
                </div>
                <div className="col-3">
                    <label>Margin</label>
                    <div className="input-group">
                        <input
                            id="margin"
                            type="string"
                            className="form-control"
                            readOnly
                            disabled
                            value={
                                props.product.price == 0
                                    ? "--"
                                    : (
                                          ((props.product.price - props.product.cost) /
                                              props.product.price) *
                                          100
                                      ).toFixed(2) + "%"
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
