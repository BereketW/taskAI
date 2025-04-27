import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/lib/prisma";
import {
  CalendarProvider,
  CommTool,
  FileStorageProvider,
  RoleInTeam,
  TaskView,
  TeamSize,
  WorkStyle,
} from "@prisma/client";
interface OnboardingInput {
  userId: string;
  jobTitle?: string;
  company?: string;
  roleInTeam?: string;
  teamSize?: string;
  workStyle?: string;
  primaryWorkType?: string;
  biggestChallenge?: string;
  preferredView?: string;
  currentTools?: string[];
  productivityPeaks?: string[];
  calendarIntegration?: string;
  communicationTool?: string;
  fileStorage?: string;
  aiFeatures?: string[];
  aiAssistanceAreas?: string[];
  primaryGoal?: string;
}
// const RoleInTeam = prisma.onboarding.RoleInTeam;
const mapRoleInTeam = (value?: string): RoleInTeam | undefined => {
  if (!value) return undefined;
  switch (value.toLowerCase()) {
    case "team-member":
      return RoleInTeam.TEAM_MEMBER;
    case "team-lead":
      return RoleInTeam.TEAM_LEAD;
    case "manager":
      return RoleInTeam.MANAGER;
    case "solo-user":
      return RoleInTeam.SOLO_USER;
    case "other":
      return RoleInTeam.OTHER;
    default:
      return undefined;
  }
};

const mapTeamSize = (value?: string): TeamSize | undefined => {
  if (!value) return undefined;
  switch (value.toLowerCase()) {
    case "just-me":
      return TeamSize.JUST_ME;
    case "2-5":
      return TeamSize.S_2_5;
    case "6-10":
      return TeamSize.S_6_10;
    case "11-25":
      return TeamSize.S_11_25;
    case "26-plus":
      return TeamSize.S_26_PLUS;
    default:
      return undefined;
  }
};

const mapWorkStyle = (value?: string): WorkStyle | undefined => {
  if (!value) return undefined;
  switch (value.toLowerCase()) {
    case "remote":
      return WorkStyle.REMOTE;
    case "in-office":
      return WorkStyle.IN_OFFICE;
    case "hybrid":
      return WorkStyle.HYBRID;
    default:
      return undefined;
  }
};

const mapTaskView = (value?: string): TaskView | undefined => {
  if (!value) return undefined;
  switch (value.toLowerCase()) {
    case "list":
      return TaskView.LIST;
    case "board":
      return TaskView.BOARD;
    case "calendar":
      return TaskView.CALENDAR;
    default:
      return undefined;
  }
};

const mapCalendarProvider = (value?: string): CalendarProvider | undefined => {
  if (!value) return undefined;
  switch (value.toLowerCase()) {
    case "google":
      return CalendarProvider.GOOGLE;
    case "outlook":
      return CalendarProvider.OUTLOOK;
    case "apple":
      return CalendarProvider.APPLE;
    case "none":
      return CalendarProvider.NONE;
    default:
      return undefined;
  }
};

const mapCommTool = (value?: string): CommTool | undefined => {
  if (!value) return undefined;
  switch (value.toLowerCase()) {
    case "slack":
      return CommTool.SLACK;
    case "teams":
      return CommTool.TEAMS;
    case "discord":
      return CommTool.DISCORD;
    case "none":
      return CommTool.NONE;
    default:
      return undefined;
  }
};

const mapFileStorageProvider = (
  value?: string
): FileStorageProvider | undefined => {
  if (!value) return undefined;
  switch (value.toLowerCase()) {
    case "gdrive":
      return FileStorageProvider.GDRIVE;
    case "dropbox":
      return FileStorageProvider.DROPBOX;
    case "onedrive":
      return FileStorageProvider.ONEDRIVE;
    case "none":
      return FileStorageProvider.NONE;
    default:
      return undefined;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const onboardingData: OnboardingInput = req.body;

    if (!onboardingData.userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const upsertedOnboarding = await prisma.onboarding.upsert({
      where: { userId: onboardingData.userId },
      update: {
        jobTitle: onboardingData.jobTitle,
        company: onboardingData.company,
        roleInTeam: mapRoleInTeam(onboardingData.roleInTeam),
        teamSize: mapTeamSize(onboardingData.teamSize),
        workStyle: mapWorkStyle(onboardingData.workStyle),
        primaryWorkType: onboardingData.primaryWorkType,
        biggestChallenge: onboardingData.biggestChallenge,
        preferredView: mapTaskView(onboardingData.preferredView),
        currentTools: onboardingData.currentTools ?? [],
        productivityPeaks: onboardingData.productivityPeaks ?? [],
        calendarIntegration: mapCalendarProvider(
          onboardingData.calendarIntegration
        ),
        communicationTool: mapCommTool(onboardingData.communicationTool),
        fileStorage: mapFileStorageProvider(onboardingData.fileStorage),
        aiFeatures: onboardingData.aiFeatures ?? [
          "suggestions",
          "prioritization",
          "insights",
        ],
        aiAssistanceAreas: onboardingData.aiAssistanceAreas ?? [],
        primaryGoal: onboardingData.primaryGoal,
      },
      create: {
        userId: onboardingData.userId,
        jobTitle: onboardingData.jobTitle,
        company: onboardingData.company,
        roleInTeam: mapRoleInTeam(onboardingData.roleInTeam),
        teamSize: mapTeamSize(onboardingData.teamSize),
        workStyle: mapWorkStyle(onboardingData.workStyle),
        primaryWorkType: onboardingData.primaryWorkType,
        biggestChallenge: onboardingData.biggestChallenge,
        preferredView: mapTaskView(onboardingData.preferredView),
        currentTools: onboardingData.currentTools ?? [],
        productivityPeaks: onboardingData.productivityPeaks ?? [],
        calendarIntegration: mapCalendarProvider(
          onboardingData.calendarIntegration
        ),
        communicationTool: mapCommTool(onboardingData.communicationTool),
        fileStorage: mapFileStorageProvider(onboardingData.fileStorage),
        aiFeatures: onboardingData.aiFeatures ?? [
          "suggestions",
          "prioritization",
          "insights",
        ],
        aiAssistanceAreas: onboardingData.aiAssistanceAreas ?? [],
        primaryGoal: onboardingData.primaryGoal,
      },
    });

    res.status(200).json({
      message: "Onboarding data saved successfully",
      data: upsertedOnboarding,
    });
  } catch (error) {
    console.error("Error saving onboarding data:", error);
    res
      .status(500)
      .json({ message: "Error saving onboarding data", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
