interface IPodcastsGridCard {
    image: string
    title: string
    author: string
    durationate: string
    published: number
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
  
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short', // 'short' fornece o mês abreviado como 'ago.'
    };
  
    // Cria o formatador para a localidade portuguesa
    const formatter = new Intl.DateTimeFormat('pt-BR', options);
  
    return formatter.format(date);
  };

  const formatDuration = (time: number | string): string => {
    let totalMinutes: number;
  
    if (typeof time === 'number') {
      // Se a duração for um número, assume-se que é a duração em segundos.
      totalMinutes = time / 60;
    } else {
      // Se a duração for uma string no formato "HH:MM:SS"
      const [hours = 0, minutes = 0, seconds = 0] = time.split(':').map(Number);
  
      // Calcula o total de minutos
      totalMinutes = hours * 60 + minutes + (seconds / 60);
    }
  
    // Formata o resultado
    return `${Math.floor(totalMinutes)} min`;
  };

export function PodcastsGridCard({author,image,title,durationate,published}: IPodcastsGridCard) {
    const data = formatDate(String(new Date(published)))
    const time = formatDuration(durationate)
    return (
        <div>
            <img className="w-sm rounded-xl" src={image} style={{boxShadow: '5px 10px 20px rgba(0,0,0,1)'}}/>
            <p className="font-bold line-clamp-2 text-white">{title}</p>
            {/* <span className="mt-2 whitespace-nowrap truncate block">{author}</span> */}
            <span className="mt-2 whitespace-nowrap truncate block">{`${data} ${'•'} ${time}`}</span>
        </div>
    )
}