'use client'
import { useState, useEffect, useRef } from 'react'
import { Logo } from '@/components/logo'
import { Activity, Map as MapIcon, MessageCircle } from 'lucide-react'
import DottedMap from 'dotted-map'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'


export default function FeaturesSection() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <section id ="location"
            className="relative py-8 md:py-12"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            
            
            <div className="relative z-10 mx-auto grid max-w-5xl border md:grid-cols-2">
                <div>
                    <div className="p-6 sm:p-12">
                        <span className="text-muted-foreground flex items-center gap-2">
                            <MapIcon className="size-4" />
                            Check Our Location On The Map
                        </span>

                        <p className="mt-8 text-2xl font-semibold">get easy access to our store location on google maps.</p>
                    </div>

                    <div
                        aria-hidden
                        className="relative">
                        <div className="absolute inset-0 z-10 m-auto size-fit">
                            <div className="rounded-(--radius) bg-background z-1 dark:bg-muted relative flex size-fit w-fit items-center gap-2 border px-3 py-1 text-xs font-medium shadow-md shadow-zinc-950/5">
                            <button
                                onClick={() => window.open('https://maps.app.goo.gl/QuDqxdFKAHrnNRjJ6', '_blank')}
                                className="text-lg cursor-pointer"
                            >
                                📍Maps
                            </button>
                            
                            </div>

                            <div className="rounded-(--radius) bg-background absolute inset-2 -bottom-2 mx-auto border px-3 py-4 text-xs font-medium shadow-md shadow-zinc-950/5 dark:bg-zinc-900"></div>
                        </div>

                        <div className="relative overflow-hidden">
                            <div className="bg-radial z-1 to-background absolute inset-0 from-transparent to-75%"></div>
                            <Map />
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden border-t bg-zinc-50 p-6 sm:p-12 md:border-0 md:border-l dark:bg-transparent">
                    <div className="relative z-10">
                        <span className="text-muted-foreground flex items-center gap-2">
                            <MessageCircle className="size-4" />
                            Email and web support
                        </span>

                        <p className="my-8 text-2xl font-semibold">Reach out via email or web for any assistance you need.</p>
                    </div>
                    <div
                        aria-hidden
                        className="flex flex-col gap-8">
                        <div>
                            <div className="flex items-center gap-2">
                                
                                <span className="text-muted-foreground text-xs">Sat 22 Feb</span>
                            </div>
                            <div className="rounded-(--radius) bg-background mt-1.5 w-3/5 border p-3 text-xs">{'Hey, I\'m having trouble with my delivery.'}</div>
                        </div>

                        <div>
                            <div className="rounded-(--radius) mb-1 ml-auto w-3/5 bg-blue-600 p-3 text-xs text-white">{'Hey boss, our team is currently working on identifying the issue. We\'ll get back to you as soon as it\'s resolved. Thank you.'}</div>
                            <span className="text-muted-foreground block text-right text-xs">Now</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-full border-y p-12">
                    <p className="text-center text-4xl font-semibold lg:text-7xl">99.99% Uptime</p>
                </div>
                <div className="relative col-span-full">
                    <div className="absolute z-10 max-w-lg px-6 pr-12 pt-6 md:px-12 md:pt-12">
                        <span className="text-muted-foreground flex items-center gap-2">
                            <Activity className="size-4" />
                            Activity feed
                        </span>

                        <p className="my-8 text-2xl font-semibold">
                            See how D3 Déco truly stands <span className="text-muted-foreground">above the rest — always.</span>
                        </p>
                    </div>
                    <MonitoringChart />
                </div>
            </div>
        </section>
    )
}

const map = new DottedMap({ height: 55, grid: 'diagonal' })

const points = map.getPoints()

const svgOptions = {
    backgroundColor: 'var(--color-background)',
    color: 'currentColor',
    radius: 0.15,
}

const Map = () => {
    const viewBox = `0 0 120 60`
    return (
        <svg
            viewBox={viewBox}
            style={{ background: svgOptions.backgroundColor }}>
            {points.map((point, index) => (
                <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r={svgOptions.radius}
                    fill={svgOptions.color}
                />
            ))}
        </svg>
    )
}

const chartConfig = {
    d3_deco: {
        label: 'D3 Déco',
        color: '#2563eb',
    },
    others: {
        label: 'Others',
        color: '#97b5daff',
    },
} satisfies ChartConfig

const chartData = [
    { month: 'May', d3_deco: 50, others: 45 },
    { month: 'June', d3_deco: 56, others: 60 },
    { month: 'July', d3_deco: 126, others: 100 },
    { month: 'August', d3_deco: 205, others: 150 },
    { month: 'September', d3_deco: 200, others: 126 },
    { month: 'October', d3_deco: 400, others: 100 },
]

const MonitoringChart = () => {
    const [isVisible, setIsVisible] = useState(false)
    const chartRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            {
                threshold: 0.3,
            }
        )

        if (chartRef.current) {
            observer.observe(chartRef.current)
        }

        return () => {
            if (chartRef.current) {
                observer.unobserve(chartRef.current)
            }
        }
    }, [])

    return (
        <div ref={chartRef}>
            {isVisible && (
                <ChartContainer
                    className="h-120 aspect-auto md:h-96"
                    config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 0,
                            right: 0,
                        }}>
                        <defs>
                            <linearGradient
                                id="fillD3Deco"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1">
                                <stop
                                    offset="0%"
                                    stopColor="var(--color-d3_deco)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="55%"
                                    stopColor="var(--color-d3_deco)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient
                                id="fillOthers"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1">
                                <stop
                                    offset="0%"
                                    stopColor="var(--color-others)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="55%"
                                    stopColor="var(--color-others)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent className="dark:bg-muted" />}
                        />
                        <Area
                            strokeWidth={2}
                            dataKey="others"
                            type="stepBefore"
                            fill="url(#fillOthers)"
                            fillOpacity={0.1}
                            stroke="var(--color-others)"
                            stackId="a"
                            animationDuration={2000}
                            animationEasing="ease-in-out"
                        />
                        <Area
                            strokeWidth={2}
                            dataKey="d3_deco"
                            type="stepBefore"
                            fill="url(#fillD3Deco)"
                            fillOpacity={0.1}
                            stroke="var(--color-d3_deco)"
                            stackId="a"
                            animationDuration={2000}
                            animationEasing="ease-in-out"
                        />
                    </AreaChart>
                </ChartContainer>
            )}
        </div>
    )
}