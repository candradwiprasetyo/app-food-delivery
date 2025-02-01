import styles from "@/styles/ErrorPage.module.css";

type ErrorPageProps = {
  message: string;
};

export default function ErrorPage({ message }: ErrorPageProps) {
  return <div className={styles.errorPage}>{message}</div>;
}
