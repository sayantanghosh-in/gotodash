import { useEffect, useRef, useState } from "react";
import { FileJson, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { fetchGithubActivity } from "@/utils/api";
import type { IGithubContribution } from "@/utils/models";
import { format, getDayOfYear } from "date-fns";
import { FE_DATE_FORMAT } from "@/utils/constants";

const GithubActivityColorMap = [
  "bg-secondary",
  "bg-chart-1",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
];

const GithubActivity = () => {
  const currentYear = useRef<number>(new Date().getFullYear());
  const [isLoadingGithubActivity, setIsLoadingGithubActivity] =
    useState<boolean>(false);
  const [contributions, setContributions] = useState<IGithubContribution[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [numberOfDaysContributed, setNumberOfDaysContributed] =
    useState<number>(0);

  const loadGithubActivities = () => {
    setIsLoadingGithubActivity(true);
    fetchGithubActivity(currentYear?.current)
      ?.then((res) => {
        setIsLoadingGithubActivity(false);
        if (
          Array?.isArray(res?.contributions) &&
          res?.contributions?.length > 0
        ) {
          const currentDayNumber = getDayOfYear(new Date());
          const contributionsSubset = res?.contributions
            ?.slice(0, currentDayNumber)
            ?.reverse()
            ?.slice(0, 140);
          setContributions(contributionsSubset);
          sessionStorage.setItem(
            "github-activity-contributions",
            JSON.stringify(contributions)
          );
          setNumberOfDaysContributed(
            contributionsSubset?.filter(
              (contribution) => contribution?.count > 0
            )?.length
          );
        } else {
          setContributions([]);
        }
        if (res?.total?.[currentYear?.current]) {
          setTotal(res?.total?.[currentYear?.current]);
          sessionStorage.setItem(
            "github-activity-total",
            res?.total?.[currentYear?.current]?.toString()
          );
        } else {
          setTotal(0);
        }
      })
      ?.catch(() => {
        setContributions([]);
        setTotal(0);
        setIsLoadingGithubActivity(false);
      });
  };

  useEffect(() => {
    if (currentYear?.current) {
      const sessionStorageTotal =
        sessionStorage.getItem("github-activity-total") || 0;
      const sessionStorageContributions =
        sessionStorage.getItem("github-activity-contributions") || undefined;

      if (
        sessionStorageTotal &&
        sessionStorageContributions &&
        Array?.isArray(JSON.parse(sessionStorageContributions)) &&
        (JSON.parse(sessionStorageContributions) as IGithubContribution[])
          ?.length > 0
      ) {
        // data present in session storage
        const currentDayNumber = getDayOfYear(new Date());
        const contributionsSubset = JSON.parse(sessionStorageContributions)
          ?.slice(0, currentDayNumber)
          ?.reverse()
          ?.slice(0, 140);
        setContributions(contributionsSubset);
        setTotal(JSON.parse(sessionStorageTotal));
        setNumberOfDaysContributed(
          contributionsSubset?.filter(
            (contribution: IGithubContribution) => contribution?.count > 0
          )?.length
        );
        return;
      }
      loadGithubActivities();
    }
  }, [currentYear]);

  return (
    <Card className="md:col-span-2 gap-2">
      <CardHeader>
        <CardTitle className="flex justify-between items-center gap-2">
          <p className="flex items-center gap-1.25 text-sm md:text-md">
            <FileJson size={18} color="var(--primary)" />
            <span>Contributions:</span>
            {isLoadingGithubActivity ? (
              <Skeleton className="h-[16px] w-[50px]" />
            ) : (
              <span className="font-bold text-primary">{total}</span>
            )}
          </p>
          <Tooltip>
            <TooltipTrigger>
              <Button
                asChild
                variant="outline"
                size="icon"
                onClick={loadGithubActivities}
              >
                <div className="w-[16px] h-[16px] p-4">
                  <RefreshCcw size={16} />
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-40 text-center">
              It might take an hour to fetch the latest data 🏃
            </TooltipContent>
          </Tooltip>
        </CardTitle>
      </CardHeader>
      <CardContent className="min-h-auto overflow-hidden overflow-y-auto grid grid-cols-1 md:grid-cols-[2fr_7fr] gap-4 justify-between">
        <div className="flex rounded-md flex-row md:flex-col items-center justify-start md:justify-center gap-2">
          <p className="text-md md:text-lg">Days Active</p>
          {isLoadingGithubActivity ? (
            <Skeleton className="h-[16px] w-[50px]" />
          ) : (
            <p className="text-md md:text-3xl text-primary">
              {numberOfDaysContributed}
            </p>
          )}
        </div>
        <div className="grid grid-flow-col grid-rows-7 grid-cols-20 gap-2">
          {isLoadingGithubActivity
            ? Array.from({ length: 20 }).map((col) => {
                return Array.from({ length: 7 }).map((row) => {
                  return (
                    <div
                      key={`col-${col}-row-${row}`}
                      className="w-4 h-4 rounded-md bg-secondary"
                    />
                  );
                });
              })
            : Array?.isArray(contributions) &&
              contributions?.map((contribution) => {
                const className = `w-4 h-4 rounded-md ${
                  contribution?.isPadding
                    ? "bg-transparent"
                    : GithubActivityColorMap[contribution?.level]
                }`;
                return (
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        key={`contribution-date-${contribution?.date}`}
                        className={className}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Date:{" "}
                        {format(new Date(contribution?.date), FE_DATE_FORMAT)}
                      </p>
                      <p>Commits: {contribution?.count}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
        </div>
      </CardContent>
    </Card>
  );
};

export default GithubActivity;
