import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { states } from "@/constants/states";
import { useFireForm } from "@/hooks/useFireForm";
import { get } from "@/lib/api";
import { getNextMonday } from "@/lib/date";
import { DashboardContext } from "@/providers/DashboardProvider";
import { ModelResult } from "@/types/model.type";
import { useQuery } from "@tanstack/react-query";
import { add, format } from "date-fns";
import { Calendar, CircleAlert, Cpu, SunIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import z, { ZodError } from "zod";

type TDatePresets = {
  option: string;
  date: string;
  day: string;
};

type TPayload = {
  state: string;
  date: string;
  tmin: string;
  tmax: string;
};

const validationSchema = z
  .object({
    state: z.string().min(2, { message: "State field is missing..." }),
    date: z.string().min(1, { message: "Date field is required and must be correct format (yyyy-mm-dd)..." }),
    tmin: z.string().min(1, { message: "Minimum temperature is missing..." }),
    tmax: z.string().min(1, { message: "Maximum temperature is missing..." }),
  })
  .required()
  .refine(
    (data) => {
      const min = Number(data.tmin);
      const max = Number(data.tmax);
      return !isNaN(min) && !isNaN(max) && min <= max;
    },
    {
      message: "Minimum temperature cannot be greater than Maximum temperature",
      path: ["tmin"],
    }
  );

const DrawerHeader: React.FC = () => {
  const initialValues = { state: "", date: "", tmin: "", tmax: "" };
  const { getFormState, batchUpdateForm } = useFireForm({ initialValues: initialValues });
  const [searchParams, setSearchParams] = useState<TPayload | null>(null);
  const dashboardContext = useContext(DashboardContext);

  const formValues = getFormState();

  const today = format(new Date(), "yyyy-LL-dd");
  const startOfNextWeek = format(getNextMonday(today), "yyyy-LL-dd");
  const nextSevenDays = format(add(today, { days: 7 }), "yyyy-LL-dd");

  const datePresets: Array<TDatePresets> = [
    {
      option: "Today",
      date: today,
      day: format(today, "EEE"),
    },
    {
      option: "Start of next week",
      date: startOfNextWeek,
      day: format(startOfNextWeek, "EEE"),
    },
    {
      option: "Next 7 days",
      date: nextSevenDays,
      day: format(nextSevenDays, "EEE"),
    },
  ];

  const queryModel = useQuery({
    queryKey: ["/model", searchParams],
    queryFn: async () => {
      if (!searchParams) return null;
      const { state, date, tmin, tmax } = searchParams;
      const url = `/model?state=${state}&date=${date}&tmin=${tmin}&tmax=${tmax}`;
      const result = await get<ModelResult>(url);
      dashboardContext?.setDataHandler(result);
      return result;
    },
    enabled: !!searchParams, // Only query when searchParams exists
    refetchOnWindowFocus: false,
    retry: 1,
  });

  useEffect(() => {
    dashboardContext?.setLoadingState(queryModel.isLoading);
    dashboardContext?.setFetchingState(queryModel.isFetching);
    dashboardContext?.setErrorState(queryModel.isError, queryModel.error instanceof Error ? queryModel.error : null);
  }, [queryModel.isLoading, queryModel.isError, queryModel.error, dashboardContext, queryModel.isFetching]);

  const handleSubmit = (payload: TPayload) => {
    try {
      validationSchema.parse(payload);
      setSearchParams(payload);
    } catch (error) {
      if (error instanceof ZodError) {
        const parsedMessage: Array<ZodError> = JSON.parse(error.message);
        parsedMessage.map((field) => {
          return toast.error(field.message, { icon: <CircleAlert size={16} color="red" />, duration: 3000 });
        });
      }
    }
  };

  return (
    <Container className="px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Cpu size={40} color="green" />
        <p className="text-[1.8em] font-medium">Risk Predictions</p>
      </div>
      <div className="flex items-center gap-2">
        <Select onValueChange={(value) => batchUpdateForm({ ...formValues.initialValues, state: value })}>
          <SelectTrigger className="w-[400px] bg-transparent rounded-full px-4 bg-white shadow-sm border-zinc-300">
            <SelectValue placeholder="Select a state:" />
          </SelectTrigger>
          <SelectContent className="rounded-xl w-[400px]">
            <SelectGroup>
              <SelectLabel>Choose state:</SelectLabel>
              {states.map((value) => (
                <SelectItem value={value.abbreviation} key={value.name}>
                  {value.name} <span className="text-zinc-400">({value.abbreviation})</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="bg-white border border-zinc-300 hover:bg-zinc-100 font-light flex gap-2 text-zinc-600 shadow-sm">
              <Calendar size={14} />
              <p className="text-[14px] font-normal">{formValues.initialValues.date.length !== 0 ? formValues.initialValues.date : "Select date:"}</p>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="border-[0.5px] border-zinc-400 w-[300px] mt-1 shadow-xl rounded-xl h-[250px] bg-white p-6 overflow-y-scroll" align="end">
            <div>
              <p className="text-zinc-500 mb-6 font-medium">Select preset dates:</p>
              <form>
                <div className="grid gap-2">
                  {datePresets.map((field) => {
                    const isChecked = (formValues.initialValues.date as string).includes(field.date);
                    return (
                      <div
                        key={field.option}
                        className={`cursor-pointer flex gap-2  p-1  rounded-md ${isChecked && "bg-blue-100 text-blue-800 px-2 duration-500"}`}
                        onClick={() => {
                          batchUpdateForm({ ...formValues.initialValues, date: field.date });
                        }}
                      >
                        <input
                          type="radio"
                          name="date"
                          value={field.date}
                          onChange={(event) => batchUpdateForm({ ...formValues.initialValues, date: event.target.value })}
                          checked={isChecked}
                        />
                        <label htmlFor={"date"} className="cursor-pointer w-full flex justify-between">
                          <span>{field.option}</span>
                          <span className="text-blue-400">{field.day}</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </form>
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="bg-white border border-zinc-300 hover:bg-zinc-100 font-light flex gap-2 text-zinc-600 shadow-sm">
              <SunIcon size={14} />
              <p className="text-[14px] font-normal">
                {formValues.initialValues.tmin.length !== 0 && formValues.initialValues.tmax.length !== 0
                  ? `${formValues.initialValues.tmin}℃ - ${formValues.initialValues.tmax}℃`
                  : "Select tempreture:"}
              </p>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="border-[0.5px] border-zinc-400 w-[300px] mt-1 shadow-xl rounded-xl h-[200px] bg-white p-6 overflow-y-scroll" align="end">
            <form>
              <div>
                <label htmlFor="tmin">Min temp:</label>
                <Input
                  type="number"
                  placeholder="Celsius..."
                  value={formValues.initialValues.tmin}
                  onChange={(event) => batchUpdateForm({ ...formValues.initialValues, tmin: event.target.value })}
                  step={0.5}
                  max={formValues.initialValues.tmax}
                />
              </div>
              <div>
                <label htmlFor="tmax">Max temp:</label>
                <Input
                  type="number"
                  placeholder="Celsius..."
                  value={formValues.initialValues.tmax}
                  onChange={(event) => batchUpdateForm({ ...formValues.initialValues, tmax: event.target.value })}
                  min={formValues.initialValues.tmin}
                />
              </div>
            </form>
          </PopoverContent>
        </Popover>
        <Button className="text-[14px]" onClick={() => handleSubmit(formValues.initialValues)} disabled={dashboardContext?.isFetching}>
          {dashboardContext?.isFetching ? <Loader message="loading..." /> : <p className="text-[14px] font-normal">Search</p>}
        </Button>
      </div>
    </Container>
  );
};

export default DrawerHeader;
