import { useEffect, useState } from "react";
import { Button } from "./Button";
import { api } from "../services/api";
import { GenreResponseProps } from "../App";

interface SideBarProps {
  onSelectGenre: (newGenreId: GenreResponseProps) => void;
}

export function SideBar({ onSelectGenre }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  //Carrega lista da api
  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(genre: GenreResponseProps) {
    setSelectedGenreId(genre.id);
    onSelectGenre(genre);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
