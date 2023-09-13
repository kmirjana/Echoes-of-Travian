import React from 'react';
import { Server } from 'interfaces/models/game/server';
import { Link } from 'react-router-dom';
import { Button } from 'components/buttons/button';
import { useAvailableServers } from 'hooks/use-available-servers';
import { usePlayerVillages } from 'hooks/use-player-villages';

type ServerCardProps = {
  server: Server;
};

export const ServerCard: React.FC<ServerCardProps> = (props) => {
  const {
    server
  } = props;

  const { deleteServer } = useAvailableServers();
  const { villages } = usePlayerVillages(server.id);

  return (
    <div
      key={server.id}
      className="relative flex w-fit gap-16 rounded-md border border-gray-400 bg-transparent px-4 py-2"
    >
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-semibold">
          {server.name}
        </span>
        <span className="flex gap-1 text-xs">
          <span className="font-semibold">
            Server seed:
          </span>
          <span>
            {server.seed}
          </span>
        </span>
        <span className="flex gap-1 text-xs">
          <span className="font-semibold">
            Server start date:
          </span>
          <span>
            {server.startDate.toString()}
          </span>
        </span>
      </div>
      <Link to={`/game/${server.name}/v-1/resources`}>
        <Button>
          Enter server
        </Button>
      </Link>
      <button
        type="button"
        className="absolute -right-2 -top-2 flex items-center justify-center rounded-full border border-gray-400 bg-white p-2"
        onClick={() => deleteServer(server)}
      >
        <span className="h-2 w-2 leading-none">
          x
        </span>
      </button>
    </div>
  );
};
