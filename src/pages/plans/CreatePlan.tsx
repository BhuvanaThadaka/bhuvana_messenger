
import PlanForm from "@/components/plan/PlanForm";

const CreatePlan = () => {
  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="mb-4">
        <h2 className="text-3xl font-bold">Create Subscription Plan</h2>
        <p className="text-muted-foreground mt-2">
          Create a new subscription plan with pricing and features
        </p>
      </div>
      <PlanForm mode="create" />
    </div>
  );
};

export default CreatePlan;
