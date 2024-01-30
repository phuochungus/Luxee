import { Product } from "@/components";
import { useFormContext } from "react-hook-form";

export function Pricing() {
    const { register, getValues } = useFormContext<Product>();
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
                            {...register("price", { valueAsNumber: true })}
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
                            {...register("compareAt", { valueAsNumber: true })}
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
                            {...register("cost", { valueAsNumber: true })}
                        />
                    </div>
                </div>
                <div className="col-3">
                    <label>Profit</label>
                    <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                            type="text"
                            className="form-control"
                            readOnly
                            disabled
                            value={
                                getValues("price") == 0 || isNaN(getValues("price"))
                                    ? "--"
                                    : getValues("price") - getValues("cost")
                            }
                        />
                    </div>
                </div>
                <div className="col-3">
                    <label>Margin</label>
                    <div className="input-group">
                        <input
                            id="margin"
                            type="text"
                            className="form-control"
                            readOnly
                            disabled
                            value={
                                getValues("price") == 0 || isNaN(getValues("price"))
                                    ? "--"
                                    : (
                                          ((getValues("price") - getValues("cost")) /
                                              getValues("price")) *
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
