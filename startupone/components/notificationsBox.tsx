import { BellIcon } from "@phosphor-icons/react";
import { Badge } from "primereact/badge";
import { OverlayPanel } from "primereact/overlaypanel";
import { useEffect, useRef, useState } from "react";

export default function NotificationsBox() {
    const op = useRef<OverlayPanel>(null);

    useEffect(() => {
        if (!op.current?.isVisible()) verifySeenNotifications();
    }, [op.current?.isVisible()]);

    const [exampleNotifications, setExampleNotifications] = useState([
        {
            id: 1,
            title: "Nova mensagem",
            description: "Você recebeu uma nova mensagem de João.",
            seen: false,
        },
        {
            id: 2,
            title: "Atualização de status",
            description: "Seu pedido foi atualizado para 'Em andamento'.",
            seen: false,
        },
    ]);

    const [unseenNotificationsCount, setUnseenNotificationsCount] = useState(
        exampleNotifications.filter((notification) => !notification.seen).length
    );

    const verifySeenNotifications = () => {
        exampleNotifications.forEach((notification) => {
            notification.seen = true;
        });
        setUnseenNotificationsCount(
            exampleNotifications.filter((notification) => !notification.seen).length
        );
    };

    return (
        <>
            <button
                onClick={(e) => {
                    op.current?.toggle(e);
                }}
                className="rounded-full transition-colors duration-150 size-[35px] bg-primary text-white cursor-pointer"
            >
                <i className="p-overlay-badge flex items-center justify-center">
                    <BellIcon size={22} weight="fill" />
                    {unseenNotificationsCount > 0 && (
                        <Badge value={unseenNotificationsCount} severity="danger"></Badge>
                    )}
                </i>
            </button>
            <OverlayPanel ref={op} showCloseIcon className="w-[250px]">
                <div className="flex flex-col">
                    <p className="text-sm font-semibold border-b border-gray-200 pb-2 px-1">
                        Notificações
                    </p>

                    <div className="flex flex-col">
                        {exampleNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className="flex flex-col py-3 border-b border-gray-200 relative cursor-pointer hover:bg-gray-50 px-1 rounded-md transition-colors duration-100"
                            >
                                {!notification.seen && (
                                    <span className="rounded-full size-[13px] absolute top-[7px] start-[-8px] bg-red-500 text-white flex items-center justify-center text-xs">
                                        !
                                    </span>
                                )}
                                <p className="font-semibold text-sm">{notification.title}</p>
                                <p className="text-xs text-gray-600">
                                    {notification.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {exampleNotifications.length === 0 && (
                        <p className="text-xs text-gray-600">Nenhuma notificação</p>
                    )}
                </div>
            </OverlayPanel>
        </>
    );
}