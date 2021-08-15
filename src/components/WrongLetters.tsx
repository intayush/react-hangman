interface WrongLetterProps {
  wrongLetters: string[];
}
function WrongLetters({ wrongLetters }: WrongLetterProps) {
  return (
    <div>
      {wrongLetters.map((letter, index) => {
        return <span key={`_wrong_${index}`}>{letter}</span>;
      })}
    </div>
  );
}

export default WrongLetters;
