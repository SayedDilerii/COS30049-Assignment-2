import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Loader from "@/components/ui/loader";
import { get } from "@/lib/api";
import { maxCharacters } from "@/lib/string";
import { useQuery } from "@tanstack/react-query";

type FeedbackItem = {
  id: number;
  full_name: string;
  email: string;
  feedback: string;
  created_at: string;
};

type FeedbackResponse = {
  status: boolean;
  results: FeedbackItem[];
};

const ViewFeedbackPage: React.FC = () => {
  const queryFeedback = useQuery({
    queryKey: ["/feedback"],
    queryFn: (context) => get<FeedbackResponse>(context.queryKey.toString()),
  });

  const feedbackCount = queryFeedback.data?.results.length;

  const renderFeedbackList = () => {
    if (queryFeedback.isLoading) {
      return <Loader message="Please wait..." />;
    }

    if (queryFeedback.error) {
      return (
        <div>
          <p>Sorry, something went wrong.</p>
          <Button variant={"destructive"} onClick={() => location.reload()}>
            Reload
          </Button>
        </div>
      );
    }

    if (queryFeedback.data) {
      const feedbackItems = queryFeedback.data.results;

      return feedbackItems.map((result) => (
        <Dialog>
          <DialogTrigger className="hover:bg-zinc-100 block w-full text-start hover:px-4 transition-all py-6 border-b">
            <div className="flex flex-col items-start">
              <p className="text-[1.1em] text-slate-800 font-semibold tracking-tight">{result.full_name}</p>
              <p className="text-slate-800">{maxCharacters(result.feedback, 500)}</p>
              <p className="text-zinc-500 font-light tracking-tight">created: {result.created_at}</p>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="grid gap-4">
              <DialogTitle className="text-2xl">
                <span className="font-normal text-zinc-500">Feedback by </span>
                {result.full_name}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-[1.1em] text-zinc-800">{result.feedback}</DialogDescription>
            <DialogFooter className="sm:items-start sm:justify-start">
              <p className="text-zinc-500 font-light tracking-tight">created: {result.created_at}</p>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ));
    }
  };

  return (
    <Container className="overflow-y-scroll">
      <section className="bg-[#106B40] h-44 sm:h-72 flex items-center px-4 sm:px-44">
        <div className="flex flex-col gap-2 sm:gap-6 text-white text-balance">
          <h1 className="text-3xl sm:text-[3.7em] font-bold">Community Feedback</h1>
          <p className="sm:text-lg font-light sm:font-medium">See what our community thinks of our product and how we can improve it</p>
        </div>
      </section>

      <section className="h-full px-4 sm:px-44 py-4 w-full">
        <div className="text-zinc-500">Results: {feedbackCount}</div>
        <div>
          {renderFeedbackList()} {renderFeedbackList()}
        </div>
      </section>
    </Container>
  );
};

export default ViewFeedbackPage;
