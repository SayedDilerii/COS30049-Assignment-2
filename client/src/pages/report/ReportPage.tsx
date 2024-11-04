import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { states } from "@/constants/states";
import { useFireForm } from "@/hooks/useFireForm";
import { CircleAlert } from "lucide-react";
import { toast } from "sonner";
import { z, ZodError } from "zod";

const DEFAULT_VALUES = {
  full_name: "",
  contact_number: "",
  state: "",
  nearest_town: "",
  discovery_date: "",
  discovery_time: "",
  severity: "",
  cause: "",
  estimated_size: "",
  status: "",
  evacuation_status: "",
  description: "",
};

type TPayload = {
  full_name: string;
  contact_number: string;
  state: string;
  nearest_town: string;
  discovery_date: string;
  discovery_time: string;
  severity: Severity;
  cause: Cause;
  estimated_size: string;
  status: Status;
  evacuation_status: EvacuationStatus;
  description?: string;
};

const severity = [{ level: "extreme" }, { level: "high" }, { level: "moderate" }, { level: "light" }];

const reportSchema = z.object({
  full_name: z.string().min(1, { message: "Full name cannot be empty" }),
  contact_number: z.string().min(1, { message: "contact number is required" }),
  state: z.string().min(1, { message: "state is required" }).max(35, { message: "this field cannot exceed over 35 characters" }),
  nearest_town: z.string().min(1, { message: "this field is required" }),
  discovery_date: z.string().min(1, { message: "this field is required" }),
  discovery_time: z.string().min(1, { message: "this field is required" }),
  severity: z.enum(["extreme", "high", "moderate", "light"]),
  cause: z.enum(["unknown", "human", "natural"]),
  estimated_size: z.string().min(1, { message: "this field is required" }),
  status: z.enum(["active", "contained", "extinguished"]),
  evacuation_status: z.enum(["none", "advisory", "mandatory"]),
  description: z.string().optional(),
});

const ReportPage: React.FC = () => {
  const { getFormState, batchUpdateForm, resetToDefault } = useFireForm({ initialValues: DEFAULT_VALUES, defaultValues: DEFAULT_VALUES });
  const formValues = getFormState();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    batchUpdateForm({ ...formValues.initialValues, [name]: value });
  };

  console.log(formValues.initialValues);

  const handleFormSubmit = (payload: TPayload) => {
    try {
      reportSchema.parse(payload);
      toast.success("Report submitted successfully!");
      console.log(JSON.stringify(formValues.initialValues));

      // mutation.mutate(payload);
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
    <Container>
      <section className="bg-[#106B40] h-44 sm:h-72 flex items-center px-4 sm:px-44">
        <div className="flex flex-col gap-2 sm:gap-6 text-white text-balance">
          <h1 className="text-3xl sm:text-[3.7em] font-bold">Report Bushfire incident</h1>
          <p className="sm:text-lg font-light sm:font-medium">Create a bushfire report to inform everyone within your state.</p>
        </div>
      </section>
      <div className="flex flex-col items-center gap-8 px-4 py-12">
        <div className="w-full sm:w-1/2">
          <form className="grid gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-2">
              <Label>
                Full Name <span className="text-orange-700">*</span>
              </Label>
              <Input
                name="full_name"
                value={formValues.initialValues.full_name}
                onChange={(event) => handleInputChange(event)}
                placeholder="Enter full name..."
                type="text"
                className="shadow-sm rounded-lg border-zinc-300"
              />
            </div>
            <div className="grid gap-2">
              <Label>
                Contact number <span className="text-orange-700">*</span>
              </Label>
              <Input
                name="contact_number"
                value={formValues.initialValues.contact_number}
                onChange={(event) => handleInputChange(event)}
                placeholder="Enter contact number..."
                type="text"
                className="shadow-sm rounded-lg border-zinc-300"
              />
            </div>
            <div className="grid gap-2">
              <Label>
                Select State: <span className="text-orange-700">*</span>
              </Label>
              <Select onValueChange={(value) => batchUpdateForm({ ...formValues.initialValues, state: value })}>
                <SelectTrigger className="shadow-sm rounded-lg border-zinc-300">
                  <SelectValue placeholder="Select a state:" />
                </SelectTrigger>
                <SelectContent className="">
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
            </div>

            <div className="grid gap-2">
              <Label>
                Nearest Town: <span className="text-orange-700">*</span>
              </Label>
              <Input
                name="nearest_town"
                value={formValues.initialValues.nearest_town}
                onChange={(event) => handleInputChange(event)}
                placeholder="Enter nearest town..."
                type="text"
                className="shadow-sm rounded-lg border-zinc-300"
              />
            </div>

            <div className="grid gap-2">
              <Label>
                Date of incident: <span className="text-orange-700">*</span>
              </Label>
              <Input
                name="discovery_date"
                value={formValues.initialValues.discovery_date}
                onChange={(event) => handleInputChange(event)}
                placeholder="Enter discovery date..."
                type="text"
                className="shadow-sm rounded-lg border-zinc-300"
              />
            </div>

            <div className="grid gap-2">
              <Label>
                Time of incident: <span className="text-orange-700">*</span>
              </Label>
              <Input
                name="discovery_time"
                value={formValues.initialValues.discovery_time}
                onChange={(event) => handleInputChange(event)}
                placeholder="Enter discovery time..."
                type="text"
                className="shadow-sm rounded-lg border-zinc-300"
              />
            </div>

            <div className="grid gap-2">
              <Label>
                Severity: <span className="text-orange-700">*</span>
              </Label>
              <Select onValueChange={(value) => batchUpdateForm({ ...formValues.initialValues, severity: value })}>
                <SelectTrigger className="shadow-sm rounded-lg border-zinc-300">
                  <SelectValue placeholder="Select severity level:" />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectGroup>
                    <SelectLabel>Choose severity:</SelectLabel>
                    {severity.map((field) => (
                      <SelectItem value={field.level} key={field.level}>
                        {field.level}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>
                Cause: <span className="text-orange-700">*</span>
              </Label>
              <Select onValueChange={(value) => batchUpdateForm({ ...formValues.initialValues, cause: value })}>
                <SelectTrigger className="shadow-sm rounded-lg border-zinc-300">
                  <SelectValue placeholder="Select cause:" />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectGroup>
                    <SelectLabel>Choose incident cause:</SelectLabel>
                    <SelectItem value={"natural"}>Natural</SelectItem>
                    <SelectItem value={"human"}>Human</SelectItem>
                    <SelectItem value={"unknown"}>Unknown</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>
                Estimated size (meters): <span className="text-orange-700">*</span>
              </Label>
              <Input
                name="estimated_size"
                value={formValues.initialValues.estimated_size}
                onChange={(event) => handleInputChange(event)}
                placeholder="Enter estimated size..."
                type="text"
                className="shadow-sm rounded-lg border-zinc-300"
              />
            </div>

            <div className="grid gap-2">
              <Label>
                Status: <span className="text-orange-700">*</span>
              </Label>
              <Select onValueChange={(value) => batchUpdateForm({ ...formValues.initialValues, status: value })}>
                <SelectTrigger className="shadow-sm rounded-lg border-zinc-300">
                  <SelectValue placeholder="Select status:" />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectGroup>
                    <SelectLabel>Choose incident status:</SelectLabel>
                    <SelectItem value={"active"}>Active</SelectItem>
                    <SelectItem value={"contained"}>Contained</SelectItem>
                    <SelectItem value={"extinguished"}>Extinguished</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>
                Evacuation Status: <span className="text-orange-700">*</span>
              </Label>
              <Select onValueChange={(value) => batchUpdateForm({ ...formValues.initialValues, evacuation_status: value })}>
                <SelectTrigger className="shadow-sm rounded-lg border-zinc-300">
                  <SelectValue placeholder="Select evacuation status:" />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectGroup>
                    <SelectLabel>Choose incident status:</SelectLabel>
                    <SelectItem value={"mandatory"}>Mandatory</SelectItem>
                    <SelectItem value={"advisory"}>Advisory</SelectItem>
                    <SelectItem value={"none"}>None</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Incident Description (optional)</Label>
              <textarea
                name="description"
                value={formValues.initialValues.description}
                onChange={(event) => handleInputChange(event)}
                placeholder="Please enter as much detail possible regarding the bushfire incident..."
                className="flex min-h-[80px] w-full border-zinc-300 shadow-sm rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </form>
          <div className="mt-8 grid gap-2">
            <Button className="w-full" type="submit" onClick={() => handleFormSubmit(formValues.initialValues)}>
              Submit Report
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ReportPage;
