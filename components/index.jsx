import { css, Style } from "hono/css";
const Upload = ({ dataList }) => {
  const htmlClass = css`
    margin: auto;
    margin-top: 100px;
    text-align: center;
    width: 50%;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 100px;
    padding-top: 100px;
    display: block;
  `;

  const imageList = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 100px;

    img {
      width: 250px;
      height: 150px;
      object-fit: cover;
      margin: 10px;
      border-radius: 10px;
      border: 1px solid black;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    p {
      color: black;
    }
  `;

  const dateTime = (unix) => {
    if (!unix) return;

    unix = parseInt(unix);
    const date = new Date(unix);
    return date.toLocaleString("id-ID");
  };

  // sort dataList
  dataList.sort((a, b) => b.localeCompare(a));

  return (
    <html>
      <head>
        <Style />
      </head>
      <body class={htmlClass}>
        <form method="POST" action="/upload" enctype="multipart/form-data">
          <input type="file" name="image" accept="image/*" />
          <button type="submit">Upload</button>
        </form>

        <div class={imageList}>
          {dataList.map(
            (item, index) =>
              index < 10 && (
                <>
                  <a
                    href={item}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={item} key={index} />
                    <p>
                      <b>File uploaded: </b>{" "}
                      {dateTime(item.split("/").pop().split(".")[0])}
                    </p>
                  </a>
                </>
              )
          )}
        </div>
      </body>
    </html>
  );
};

export default Upload;
