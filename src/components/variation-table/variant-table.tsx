import { Product } from "@/components";
import { useFormContext } from "react-hook-form";

export function VariantTable() {
    const { getValues } = useFormContext<Product>();

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>
                            Variant (
                            {getValues("options")
                                .map((a) => a.name)
                                .join("-")}
                            )
                        </th>

                        <th>Unavailable</th>
                        <th>Committed</th>
                        <th>Available</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {getValues("variants").map((variant, index: number) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>
                                {variant.variantOptionValues
                                    .map((a) => a.value.value)
                                    .join(" / ")}
                            </td>
                            <td>{variant.unavailable}</td>
                            <td>{variant.committed}</td>
                            <td>{variant.available}</td>
                            <td>
                                <div>
                                    <button className="btn btn-outline-secondary btn-sm me-1">
                                        Hide
                                    </button>
                                    <button className="btn btn-outline-primary btn-sm">
                                        Edit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
