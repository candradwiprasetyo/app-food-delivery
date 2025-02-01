import styles from "@/styles/ErrorPage.module.css";

type ErrorPageProps = {
  message: string;
};

export default function ErrorPage({ message }: ErrorPageProps) {
  return <p className={styles.errorPage}>{message}</p>;
}
