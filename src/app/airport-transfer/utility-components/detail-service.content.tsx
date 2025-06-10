export function DetailServiceContent({ waitingTime }: { waitingTime: number }) {
  return (
    <div className="prose-ol:list-disc text-start prose-sm md:prose-base px-4 py-2 text-black">
      <ol className="list-decimal pl-5">
        <li>
          <strong>Instant Confirmation</strong>
          <br />
          <span>
            You'll get your booking confirmation in minutes after your payment
            is complete
          </span>
        </li>
        <li>
          <strong>Free waiting time</strong>
          <br />
          <span>
            You will get a free waiting time of {waitingTime} minutes!
          </span>
        </li>
        <li>
          <strong> Meet & Greet</strong>
          <br />
          <span>
            Driver will be waiting to escort you to your vehicle upon your
            arrival
          </span>
        </li>
        <li>
          <strong>English-speaking driver</strong>
          <br />
          <span>
            Driver can communicate in English, in addition to their local
            language
          </span>
        </li>
      </ol>
    </div>
  );
}
