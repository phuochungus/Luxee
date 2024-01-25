import { Product, Variant, Variation } from "@/pages";

interface VarianttableProps {
    product: Product;
}

export function VarianTable(props: VarianttableProps) {
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>
                            Variant (
                            {props.product.variations
                                .map((a: Variation) => a.name)
                                .join("-")}
                            )
                        </th>

                        <th>Unavailable</th>
                        <th>Commited</th>
                        <th>Available</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.product.variants.map((variant: Variant, index: number) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>
                                {variant.selectedVariations
                                    .map((e) => e.value)
                                    .join(" / ")}
                            </td>
                            <td>{variant.unavailable}</td>
                            <td>{variant.commited}</td>
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
