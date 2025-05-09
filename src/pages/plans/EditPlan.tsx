
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchSubscriptionPlanById, clearSelectedPlan } from "@/redux/slices/planSlice";
import PlanForm from "@/components/plan/PlanForm";
import { Skeleton } from "@/components/ui/skeleton";

const EditPlan = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPlan, loading } = useSelector((state: RootState) => state.plan);

  useEffect(() => {
    if (id) {
      dispatch(fetchSubscriptionPlanById(id));
    }

    return () => {
      dispatch(clearSelectedPlan());
    };
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-32" />
        <div className="space-y-6 mt-8">
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  if (!selectedPlan) {
    return (
      <div className="flex-1 space-y-4 p-6">
        <h2 className="text-3xl font-bold">Plan Not Found</h2>
        <p>The subscription plan you are looking for does not exist or you do not have permission to view it.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="mb-4">
        <h2 className="text-3xl font-bold">Edit Subscription Plan</h2>
        <p className="text-muted-foreground mt-2">
          Update the details of the "{selectedPlan.name}" subscription plan
        </p>
      </div>
      <PlanForm plan={selectedPlan} mode="edit" />
    </div>
  );
};

export default EditPlan;
