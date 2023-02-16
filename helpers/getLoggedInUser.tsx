'use client';

import { pb } from "./dbconnect";

export default function getLoggedInUser() {
  if (pb.authStore.isValid) {
    return pb.authStore.model;
  }
  return null;
}