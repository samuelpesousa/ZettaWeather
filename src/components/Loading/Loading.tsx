export default function Loading() {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="spinner-border text-primary" role="status" />
        <span className="ms-2">Carregando...</span>
      </div>
    );
  }