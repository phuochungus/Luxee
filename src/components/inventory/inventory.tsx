import { Product } from "@/components";
import { useFormContext } from "react-hook-form";

export function Inventory() {
    const { register, watch } = useFormContext<Product>();
    return (
        <div>
            <h5>Inventory</h5>
            <div className="row mb-2 g-3">
                <div className="col-3">
                    <label>SKU</label>
                    <input type="text" className="form-control" {...register("sku")} />
                </div>
                <div className="col-3">
                    <label htmlFor="">Barcode</label>
                    <input
                        type="text"
                        className="form-control"
                        {...register("barcode")}
                    />
                </div>
                <div className="col-6" />

                <div className="col-3">
                    <label>Unavailable</label>
                    <input
                        required={!watch("variants")?.length}
                        type="number"
                        className="form-control"
                        {...register("unavailable")}
                    />
                    <div className="invalid-feedback">Field is required</div>
                </div>
                <div className="col-3">
                    <label>Committed</label>
                    <input
                        required={!watch("variants")?.length}
                        type="number"
                        className="form-control"
                        {...register("committed")}
                    />
                    <div className="invalid-feedback">Field is required</div>
                </div>
                <div className="col-3">
                    <label>Available</label>
                    <input
                        required={!watch("variants")?.length}
                        type="number"
                        className="form-control"
                        {...register("available")}
                    />
                    <div className="invalid-feedback">Field is required</div>
                </div>
                <div className="col-3">
                    <label>On-hand</label>
                    <input
                        type="number"
                        className="form-control"
                        readOnly
                        disabled
                        value={
                            +watch("available") +
                            +watch("committed") +
                            +watch("unavailable")
                        }
                    />
                </div>
            </div>
        </div>
    );
}
