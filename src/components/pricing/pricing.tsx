export function Pricing(props: any) {
    return (
        <div>
            <h5>Pricing</h5>
            <div>
                <div className="row">
                    <div className="col-3">
                        <label>Price*</label>
                        <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input
                                type="number"
                                className="form-control"
                                required
                                value={props.product.price}
                                onChange={(e) =>
                                    props.setProduct({
                                        ...props.product,
                                        price: e.target.value,
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
                                value={props.product.compareAt}
                                onChange={(e) =>
                                    props.setProduct({
                                        ...props.product,
                                        compareAt: e.target.value,
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
                                value={props.product.cost}
                                onChange={(e) =>
                                    props.setProduct({
                                        ...props.product,
                                        cost: e.target.value,
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
                                type="number"
                                className="form-control"
                                readOnly
                                disabled
                                value={
                                    parseFloat(props.product.price.toString()) -
                                    parseFloat(props.product.cost.toString())
                                }
                            />
                        </div>
                    </div>
                    <div className="col-3">
                        <label>Margin</label>
                        <div className="input-group">
                            <input
                                type="number"
                                className="form-control"
                                readOnly
                                disabled
                                value={
                                    isNaN(
                                        (parseFloat(props.product.price.toString()) -
                                            parseFloat(props.product.cost.toString())) /
                                            parseFloat(props.product.price.toString())
                                    )
                                        ? "0"
                                        : `${(
                                              ((parseFloat(
                                                  props.product.price.toString()
                                              ) -
                                                  parseFloat(
                                                      props.product.cost.toString()
                                                  )) /
                                                  parseFloat(
                                                      props.product.price.toString()
                                                  )) *
                                              100
                                          ).toFixed(2)}`
                                }
                            />
                            <span className="input-group-text">%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
