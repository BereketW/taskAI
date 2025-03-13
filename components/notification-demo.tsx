"use client";

import { Button } from "@/components/ui/button";
import { useNotification } from "@/components/ui/notification-bar";

export function NotificationDemo() {
  const { addNotification } = useNotification();

  const showSuccessNotification = () => {
    addNotification({
      type: "success",
      title: "Task Completed",
      message: "You've successfully completed the task.",
      duration: 5000,
      action: {
        label: "Undo",
        onClick: () => {
          console.log("Undo action clicked");
        },
      },
    });
  };

  const showErrorNotification = () => {
    addNotification({
      type: "error",
      title: "Error Occurred",
      message: "There was an error while saving your changes.",
      duration: 5000,
      action: {
        label: "Try Again",
        onClick: () => {
          console.log("Try again clicked");
        },
      },
    });
  };

  const showWarningNotification = () => {
    addNotification({
      type: "warning",
      title: "Approaching Deadline",
      message: "You have tasks due in the next 24 hours.",
      duration: 5000,
      action: {
        label: "View Tasks",
        onClick: () => {
          console.log("View tasks clicked");
        },
      },
    });
  };

  const showInfoNotification = () => {
    addNotification({
      type: "info",
      title: "New Feature Available",
      message: "Check out our new AI-powered task suggestions.",
      duration: 5000,
      action: {
        label: "Learn More",
        onClick: () => {
          console.log("Learn more clicked");
        },
      },
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={showSuccessNotification} variant="outline" size="sm">
        Show Success
      </Button>
      <Button onClick={showErrorNotification} variant="outline" size="sm">
        Show Error
      </Button>
      <Button onClick={showWarningNotification} variant="outline" size="sm">
        Show Warning
      </Button>
      <Button onClick={showInfoNotification} variant="outline" size="sm">
        Show Info
      </Button>
    </div>
  );
}
