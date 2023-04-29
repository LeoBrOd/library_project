import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GOOGLE_API_KEY from "../Constants";
import axios from "axios";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";

const PrivateLibrary = (props) => {
  const [library, setLibrary] = useState([]);
  const [libraryStatus, setLibraryStatus] =
    useState(0);
  const [countLibrary, setCountLibrary] =
    useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setLibrary([]);
    axios
      .get("/getbooks", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          userid: props.id,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          return res.data;
        }
      })
      .then((data) => {
        setCountLibrary(data);
        data[libraryStatus].forEach((element) => {
          return fetch(
            `https://www.googleapis.com/books/v1/volumes/${element.bookId}?key=${GOOGLE_API_KEY}`
          )
            .then((res) => {
              if (res.status == 200) {
                return res.json();
              }
            })
            .then((book) => {
              setLibrary((library) => [
                ...library,
                book,
              ]);
            })
            .catch((e) => {
              console.log(e);
            });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [libraryStatus]);

  return (
    <div>
      {library.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            maxWidth: "75%",
          }}
        >
          {library.map((item) => {
            return (
              <div key={`${item.id}`}>
                <img
                  style={{ height: "100px" }}
                  src={
                    item.volumeInfo.imageLinks
                      .smallThumbnail
                  }
                  alt={item.volumeInfo.title}
                  loading="lazy"
                   onClick={(e) => {
                    navigate(`/books/${item.id}`)}
                  }
                />
              </div>
            );
          })}
          {props.accessToken && (
            <List
              sx={{ border: "1px solid black" }}
            >
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    setLibraryStatus(0);
                  }}
                >
                  <Badge
                    badgeContent={
                      countLibrary[0].length === 0
                        ? "0"
                        : countLibrary[0].length
                    }
                    color="primary"
                  >
                    All
                  </Badge>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    setLibraryStatus(1);
                  }}
                >
                  <Badge
                    badgeContent={
                      countLibrary[1].length === 0
                        ? "0"
                        : countLibrary[1].length
                    }
                    color="primary"
                  >
                    Favorites
                  </Badge>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    setLibraryStatus(2);
                  }}
                >
                  <Badge
                    badgeContent={
                      countLibrary[2].length === 0
                        ? "0"
                        : countLibrary[2].length
                    }
                    color="primary"
                  >
                    Read
                  </Badge>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    setLibraryStatus(4);
                  }}
                >
                  <Badge
                    badgeContent={
                      countLibrary[4].length === 0
                        ? "0"
                        : countLibrary[4].length
                    }
                    color="primary"
                  >
                    Currently Reading
                  </Badge>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    setLibraryStatus(3);
                  }}
                >
                  <Badge
                    badgeContent={
                      countLibrary[3].length === 0
                        ? "0"
                        : countLibrary[3].length
                    }
                    color="primary"
                  >
                    Want to read
                  </Badge>
                </ListItemButton>
              </ListItem>
            </List>
          )}
        </Box>
      ) : (
        <h3>
          Your library is empty, lets add some
          books from the recommendations below
        </h3>
      )}
    </div>
  );
};

export default PrivateLibrary;
