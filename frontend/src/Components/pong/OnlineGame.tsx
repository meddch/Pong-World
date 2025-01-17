"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Stage } from "@react-three/drei";
import Paddle from "./Paddle";
import Ball from "./Ball";
import Helpers from "./Helpers";
import DashedLine from "./DashedLine";
import Env from "./Env";
import Borders from "./Borders";
import OnlineEventHandler from "./OnlineEventHandler";
import Score from "./Score";

export default function OnlineGame({
	mode,
	local,
	room_id,
	setWinner,
	gameState,
	setGameState,
}: {
	mode: string;
	local: boolean;
	room_id: string;
	setWinner: (winner: any) => void;
	gameState: string;
	setGameState: (state: string) => void;
}): JSX.Element {
	const [score1, setScore1] = useState(0);
	const [score2, setScore2] = useState(0);
	const socket = useRef<WebSocket>(null) as React.MutableRefObject<WebSocket>;
	const ballRef = useRef<THREE.Mesh>() as React.MutableRefObject<THREE.Mesh>;
	const paddle1Ref =
		useRef<THREE.Mesh>() as React.MutableRefObject<THREE.Mesh>;
	const paddle2Ref =
		useRef<THREE.Mesh>() as React.MutableRefObject<THREE.Mesh>;

	function updateGame(data: any) {
		if (!ballRef.current || !paddle1Ref.current || !paddle2Ref.current)
			return;
		paddle1Ref.current.position.x = data.paddle1.x;
		paddle2Ref.current.position.x = data.paddle2.x;
		ballRef.current.position.x = data.ball.x;
		ballRef.current.position.z = data.ball.z;
		if (data.score1 !== score1) setScore1(data.score.player1);
		if (data.score2 !== score2) setScore2(data.score.player2);
	}

	function handleGameover(data: any) {
		setWinner(data.winner);
		setScore1(data.score.player1);
		setScore2(data.score.player2);
	}
	const updateGameState = (state: string)  => setGameState(state);

	function update(data: any) {
		if (data.state === "waiting") {
			gameState !== "waiting" && updateGameState("waiting");
		}
		if (data.state === "paused") {
			gameState !== "paused" && updateGameState("paused");
		}
		if (data.state === "playing") {
			gameState !== "playing" && updateGameState("playing");
			updateGame(data);
		}
		if (data.state === "gameover") {
			gameState !== "gameover" && updateGameState("gameover");
			handleGameover(data);
		}
		if (data.state === "disconnected") {
			gameState !== "disconnected" && updateGameState("disconnected");
		}
	}
	useEffect(() => {
		const accessToken = localStorage.getItem("user_token");
			socket.current = new WebSocket(
				`${process.env.NEXT_PUBLIC_SOCKET_ENDPOINT}onlinegame/?token=${accessToken}`
			);
		socket.current.onopen = () => {
			socket.current.send(
				JSON.stringify({
					type: "join",
					room_id: room_id,
				})
				);
		};
		if (!socket.current) return;
		socket.current.onmessage = (event) => {
			const data = JSON.parse(event.data);
			update(data);
		};
		return () => {
			if (socket.current) {
				socket.current.close();
			}
		};
	}, []);

	return (
		<>
			<Env />
			<Borders />
			<Stage
				environment="city"
				intensity={0.6}
				castShadow={true}
				adjustCamera
			>
				{/* @ts-ignore */}
				<Ball position={[0, 0, 0]} ref={ballRef} />
				{/* @ts-ignore */}
				<Paddle position={[0, 0, 6]} ref={paddle1Ref} />
				{/* @ts-ignore */}
				<Paddle position={[0, 0, -6]} ref={paddle2Ref} />
			</Stage>
			{/* <Floor /> */}
			<Score score1={score1} score2={score2} />
			<OnlineEventHandler socket={socket} />
			<DashedLine />
			<Helpers />
		</>
	);
}
