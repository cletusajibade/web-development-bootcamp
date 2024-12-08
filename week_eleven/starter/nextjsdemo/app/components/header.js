export default function Header(props) {
  const { title, age } = props;

  return (
    <div>
      <div>
        <h1>
          {title} <br /> {age}
        </h1>
      </div>
      <div>Another component</div>
    </div>
  );
}
