import { useActionState } from "react";
import supabaseClient from "../supabase-client";
function Form({ metrics }) {
  const [errors, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      const newDeal = {
        name: formData.get("name"),
        value: formData.get("value"),
      };
      try {
        const { error } = await supabaseClient
          .from("sales_deals")
          .insert({ value: Number(newDeal.value), name: newDeal.name });
        if (error) {
          throw error;
        }
        return error;
      } catch (error) {
        console.log(error.message);
      }
    },
    null,
  );

  const generateOptions = () => {
    return metrics.map((metric) => (
      <option key={metric.name} value={metric.name}>
        {metric.name}
      </option>
    ));
  };

  return (
    <div className="add-form-container">
      <form
        action={submitAction}
        aria-label="Add new sales deal"
        aria-describedby="form-description"
      >
        <div id="form-description" className="sr-only">
          Use this form to add a new sales deal. Select a sales rep and enter
          the amount.
        </div>

        <label htmlFor="deal-name">
          Name:
          <select
            id="deal-name"
            name="name"
            defaultValue={metrics?.[0]?.name || ""}
            aria-required="true"
            // aria-invalid=
            disabled={isPending}
          >
            {generateOptions()}
          </select>
        </label>

        <label htmlFor="deal-value">
          Amount: $
          <input
            id="deal-value"
            type="number"
            name="value"
            defaultValue={0}
            className="amount-input"
            // min=
            // "0"
            step="10"
            aria-required="true"
            // aria-invalid=
            aria-label="Deal amount in dollars"
            disabled={isPending}
          />
        </label>

        <button
          type="submit"
          disabled={isPending}
          // aria-busy=
        >
          {isPending ? "Adding Deal" : "Add a Deal"}{" "}
          {/*'Adding deal' when pending*/}
        </button>
      </form>
    </div>
  );
}

export default Form;
