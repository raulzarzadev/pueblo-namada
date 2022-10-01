import GuestCard from "comps/Guests/Guest/GuestCard";

const GuestsCards = ({ guests }) => {
  return (
    <div>
      { guests?.map((guest, i) => (
        <GuestCard
          key={ `${guest.id}-${i}` }
          guest={ guest }
        // isOwner={ isOwner }
        // place={ place }
        />
      )) }
    </div>
  );
}

export default GuestsCards;