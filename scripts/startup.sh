#! /usr/bin/env bash
set -ex

yarn

cd ./packages

cp server/.env.local server/.env
cp web/.env.local web/.env

cd ..

yarn seed
