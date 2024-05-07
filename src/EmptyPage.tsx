import { Button } from "@/components/ui/button";
import { useStartThread } from "./useStartThread";

export function EmptyPage() {
  const [startThread, startingThread] = useStartThread();
  return (
    <div className="flex-1 flex flex-col gap-2 items-center justify-center">
      <h2 className="text-2xl md:text-4xl">Welcome to llama farm!</h2>
      <p className="text-lg text-center p-4">
        Start a new conversation with one of the 🦙s on our farm. 🧑‍🌾
        <br />
        Send the link 🔗 of a conversation for friends to join 👯.
      </p>
      <Button
        variant={"default"}
        disabled={startingThread}
        onClick={startThread}
      >
        Start a new conversation
      </Button>
      <pre className="md:mt-16">
        {"💬🧑‍💻-🌐-🧑‍💻💬"}
        <br />
        {"    / \\ "}
        <br />
        {"  | | | | "}
        <br />
        {"  💻💻💻💻 "}
        <br />
        {"  🦙🦙🦙🦙"}
      </pre>
      <p className="text-lg text-center max-w-md">
        All of the responses are generated by <code>llama3</code> running on
        personal computers. <br />
        <span className="text-sm p-2">
          ...without needing proxied traffic or load balancing, using a
          technique called "work stealing" 🤓
        </span>
        <br />
        <br />
        Use the public farm, or run your own farm to have
        <br />a group chat with friends, augmented with 🦙s.
      </p>
      <a
        href="https://github.com/get-convex/llama-farm-chat"
        className="flex items-center rounded bg-neutral-n2 text-neutral-n11 transition-colors hover:bg-neutral-white py-4"
        target="_blank"
      >
        <div className="flex grow flex-col">
          <span className="mb-2 text-3xl leading-none">
            get-convex/<strong>llama-farm-chat</strong>
          </span>
        </div>
      </a>
    </div>
  );
}
