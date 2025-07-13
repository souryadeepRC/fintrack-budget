import { Button, Loader } from "@/components/common";
import { ActionButtonType } from "@/types";
import "./Card.scss";

interface DashboardViewProps {
  isLoading: boolean;
  type: string;
  headerActions?: ActionButtonType[];
  children: React.ReactNode;
}

const DashboardView: React.FC<DashboardViewProps> = (props) => {
  const { isLoading, type, headerActions, children } = props;

  if (isLoading) return <Loader />;
  return (
    <div className="dashboard__container">
      {headerActions && (
        <div className="dashboard__actions">
          {headerActions.map((action) => {
            return (
              <Button
                key={action.label}
                data-testid={`${type}-${action.label}-btn`}
                onClick={action.onClick}
                {...(action.startIcon && { startIcon: action.startIcon })}
              >
                {action.label}
              </Button>
            );
          })}
        </div>
      )}
      {children}
    </div>
  );
};

export default DashboardView;
