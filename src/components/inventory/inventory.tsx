import { Product } from "@/components";
import { useFormContext } from "react-hook-form";

export function Inventory() {
    const { register, watch } = useFormContext<Product>();
    return (
        <div>
            <h5>Inventory</h5>
            <div className="row mb-2">
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
            </div>
            <div className="row">
                <div className="col-3">
                    <label>Unavailable</label>
                    <input
                        type="number"
                        className="form-control"
                        {...register("unavailable")}
                    />
                </div>
                <div className="col-3">
                    <label>Commited</label>
                    <input
                        type="number"
                        className="form-control"
                        {...register("commited")}
                    />
                </div>
                <div className="col-3">
                    <label>Available</label>
                    <input
                        type="number"
                        className="form-control"
                        {...register("available")}
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
                            +watch("available") +
                            +watch("commited") +
                            +watch("unavailable")
                        }
                    />
                </div>
            </div>
        </div>
    );
}
